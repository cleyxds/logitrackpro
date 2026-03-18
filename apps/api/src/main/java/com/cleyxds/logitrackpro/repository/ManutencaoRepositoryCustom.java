package com.cleyxds.logitrackpro.repository;

import com.cleyxds.logitrackpro.dto.DashboardMaintenanceItemResponse;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ManutencaoRepositoryCustom {

  BigDecimal getCurrentMonthMaintenanceCost(LocalDate start, LocalDate end);

  List<DashboardMaintenanceItemResponse> findUpcomingMaintenances(LocalDate date, String status);
}