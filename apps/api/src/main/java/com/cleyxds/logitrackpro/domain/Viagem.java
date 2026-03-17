package com.cleyxds.logitrackpro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "viagens")
@Data
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(name = "data_saida", nullable = false)
    private LocalDateTime dataSaida;

    @Column(name = "data_chegada", nullable = false)
    private LocalDateTime dataChegada;

    @Column(nullable = false, length = 100)
    private String origem;

    @Column(nullable = false, length = 100)
    private String destino;

    @Column(name = "km_percorrida", nullable = false, precision = 10, scale = 2)
    private BigDecimal kmPercorrida;

}
