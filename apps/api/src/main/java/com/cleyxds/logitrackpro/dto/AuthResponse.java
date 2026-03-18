package com.cleyxds.logitrackpro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
  private String access_token;
  private String refresh_token;
  private UsuarioResponse user;
}
