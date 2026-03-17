package com.cleyxds.logitrackpro.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemResponse(
    Long id,
    Long veiculoId,
    String veiculoPlaca,
    LocalDateTime dataSaida,
    LocalDateTime dataChegada,
    String origem,
    String destino,
    BigDecimal kmPercorrida
) {
}
