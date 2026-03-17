package com.cleyxds.logitrackpro.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "manutencoes")
@Data
public class Manutencao {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "veiculo_id", nullable = false)
  private Veiculo veiculo;

  @Column(name = "data_inicio", nullable = false)
  private LocalDate dataInicio;

  @Column(name = "data_finalizacao")
  private LocalDate dataFinalizacao;

  @Column(name = "tipo_servico", nullable = false, length = 100)
  private String tipoServico;

  @Column(name = "custo_estimado", nullable = false, precision = 10, scale = 2)
  private BigDecimal custoEstimado;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private StatusManutencao status;
}