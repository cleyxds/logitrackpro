package com.cleyxds.logitrackpro.dto;

import com.cleyxds.logitrackpro.domain.StatusManutencao;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DashboardMaintenanceItemResponse(
    Long id,
    Long veiculoId,
    String veiculoPlaca,
    String veiculoModelo,
    String tipoServico,
    LocalDate dataInicio,
    LocalDate dataFinalizacao,
    BigDecimal custoEstimado,
    StatusManutencao status) {
}