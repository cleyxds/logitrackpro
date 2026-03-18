package com.cleyxds.logitrackpro.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.cleyxds.logitrackpro.domain.StatusManutencao;
import com.cleyxds.logitrackpro.dto.DashboardMaintenanceItemResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ManutencaoRepositoryImpl implements ManutencaoRepositoryCustom {

  private final JdbcTemplate jdbcTemplate;

  public ManutencaoRepositoryImpl(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public BigDecimal getCurrentMonthMaintenanceCost(LocalDate start, LocalDate end) {
    String sql = """
            SELECT COALESCE(SUM(m.custo_estimado), 0)
            FROM manutencoes m
            WHERE m.data_inicio >= ?
              AND m.data_inicio <= ?
        """;

    return jdbcTemplate.queryForObject(sql, BigDecimal.class, start, end);
  }

  @Override
  public List<DashboardMaintenanceItemResponse> findUpcomingMaintenances(LocalDate date, String status) {
    String sql = """
            SELECT m.id,
                   v.id AS veiculo_id,
                   v.placa AS veiculo_placa,
                   v.modelo AS veiculo_modelo,
                   m.tipo_servico,
                   m.data_inicio,
                   m.data_finalizacao,
                   m.custo_estimado,
                   m.status
            FROM manutencoes m
            JOIN veiculos v ON v.id = m.veiculo_id
            WHERE m.status <> ?
              AND m.data_inicio >= ?
            ORDER BY m.data_inicio ASC
            LIMIT 5
        """;

    return jdbcTemplate.query(sql, new Object[] { status, date }, (rs, rowNum) -> new DashboardMaintenanceItemResponse(
        rs.getLong("id"),
        rs.getLong("veiculo_id"),
        rs.getString("veiculo_placa"),
        rs.getString("veiculo_modelo"),
        rs.getString("tipo_servico"),
        rs.getObject("data_inicio", LocalDate.class),
        rs.getObject("data_finalizacao", LocalDate.class),
        rs.getBigDecimal("custo_estimado"),
        StatusManutencao.valueOf(rs.getString("status"))));
  }
}
