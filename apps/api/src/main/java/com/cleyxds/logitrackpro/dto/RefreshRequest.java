package com.cleyxds.logitrackpro.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshRequest {
  @NotBlank(message = "Refresh token é obrigatório")
  private String refreshToken;
}
