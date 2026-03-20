package com.cleyxds.logitrackpro.service;

import com.cleyxds.logitrackpro.domain.StatusManutencao;
import com.cleyxds.logitrackpro.dto.DashboardMaintenanceItemResponse;
import com.cleyxds.logitrackpro.dto.DashboardSummaryResponse;
import com.cleyxds.logitrackpro.repository.ManutencaoRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {
  private final ManutencaoRepository manutencaoRepository;

  @Transactional(readOnly = true)
  public DashboardSummaryResponse getSummary() {
    LocalDate today = LocalDate.now();
    LocalDate firstDayOfMonth = today.withDayOfMonth(1);
    LocalDate lastDayOfMonth = today.withDayOfMonth(today.lengthOfMonth());

    BigDecimal currentMonthMaintenanceCost = manutencaoRepository.getCurrentMonthMaintenanceCost(
        firstDayOfMonth,
        lastDayOfMonth);

    List<DashboardMaintenanceItemResponse> upcomingMaintenance = manutencaoRepository.findUpcomingMaintenances(
        today,
        StatusManutencao.CONCLUIDA.name());

    return new DashboardSummaryResponse(currentMonthMaintenanceCost, upcomingMaintenance);
  }
}