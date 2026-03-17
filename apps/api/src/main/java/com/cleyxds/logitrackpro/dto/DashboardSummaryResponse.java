package com.cleyxds.logitrackpro.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardSummaryResponse(
    BigDecimal currentMonthMaintenanceCost,
    List<DashboardMaintenanceItemResponse> upcomingMaintenance) {
}