package com.cleyxds.logitrackpro.service;

import com.cleyxds.logitrackpro.domain.Manutencao;
import com.cleyxds.logitrackpro.domain.StatusManutencao;
import com.cleyxds.logitrackpro.dto.DashboardMaintenanceItemResponse;
import com.cleyxds.logitrackpro.dto.DashboardSummaryResponse;
import com.cleyxds.logitrackpro.repository.ManutencaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

  private final ManutencaoRepository manutencaoRepository;

  public DashboardService(ManutencaoRepository manutencaoRepository) {
    this.manutencaoRepository = manutencaoRepository;
  }

  @Transactional(readOnly = true)
  public DashboardSummaryResponse getSummary() {
    LocalDate today = LocalDate.now();
    LocalDate firstDayOfMonth = today.withDayOfMonth(1);
    LocalDate lastDayOfMonth = today.withDayOfMonth(today.lengthOfMonth());

    List<Manutencao> manutencoes = manutencaoRepository.findAll();

    List<DashboardMaintenanceItemResponse> upcomingMaintenance = manutencoes.stream()
        .filter(manutencao -> manutencao.getStatus() != StatusManutencao.CONCLUIDA)
        .filter(manutencao -> !manutencao.getDataInicio().isBefore(today))
        .sorted((left, right) -> left.getDataInicio().compareTo(right.getDataInicio()))
        .limit(5)
        .map(this::toItemResponse)
        .toList();

    BigDecimal currentMonthMaintenanceCost = manutencoes.stream()
        .filter(manutencao -> !manutencao.getDataInicio().isBefore(firstDayOfMonth))
        .filter(manutencao -> !manutencao.getDataInicio().isAfter(lastDayOfMonth))
        .map(Manutencao::getCustoEstimado)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    return new DashboardSummaryResponse(currentMonthMaintenanceCost, upcomingMaintenance);
  }

  private DashboardMaintenanceItemResponse toItemResponse(Manutencao manutencao) {
    return new DashboardMaintenanceItemResponse(
        manutencao.getId(),
        manutencao.getVeiculo().getId(),
        manutencao.getVeiculo().getPlaca(),
        manutencao.getVeiculo().getModelo(),
        manutencao.getTipoServico(),
        manutencao.getDataInicio(),
        manutencao.getDataFinalizacao(),
        manutencao.getCustoEstimado(),
        manutencao.getStatus());
  }
}