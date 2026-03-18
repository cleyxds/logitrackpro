package com.cleyxds.logitrackpro.controller;

import com.cleyxds.logitrackpro.dto.AuthResponse;
import com.cleyxds.logitrackpro.dto.LoginRequest;
import com.cleyxds.logitrackpro.dto.RefreshRequest;
import com.cleyxds.logitrackpro.dto.RegisterRequest;
import com.cleyxds.logitrackpro.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
    try {
      AuthResponse response = authService.login(request);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
    try {
      AuthResponse response = authService.register(request);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  @PostMapping("/refresh")
  public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
    try {
      AuthResponse response = authService.refresh(request.getRefreshToken());
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.status(401).build();
    }
  }
}
