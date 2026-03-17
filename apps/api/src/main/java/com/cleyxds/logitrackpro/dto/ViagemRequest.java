package com.cleyxds.logitrackpro.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemRequest(
    @NotNull Long veiculoId,
    @NotNull LocalDateTime dataSaida,
    @NotNull LocalDateTime dataChegada,
    @NotBlank String origem,
    @NotBlank String destino,
    @NotNull @DecimalMin(value = "0.01") BigDecimal kmPercorrida
) {
}
