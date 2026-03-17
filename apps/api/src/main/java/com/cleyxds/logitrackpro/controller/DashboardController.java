package com.cleyxds.logitrackpro.controller;

import com.cleyxds.logitrackpro.dto.DashboardSummaryResponse;
import com.cleyxds.logitrackpro.service.DashboardService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

  private final DashboardService dashboardService;

  public DashboardController(DashboardService dashboardService) {
    this.dashboardService = dashboardService;
  }

  @GetMapping
  public DashboardSummaryResponse getSummary() {
    return dashboardService.getSummary();
  }
}