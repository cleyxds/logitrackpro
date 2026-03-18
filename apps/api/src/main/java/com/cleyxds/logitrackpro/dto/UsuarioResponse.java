package com.cleyxds.logitrackpro.dto;

import com.cleyxds.logitrackpro.domain.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponse {
  private Long id;
  private String email;
  private String nome;

  public static UsuarioResponse fromEntity(Usuario usuario) {
    return UsuarioResponse.builder()
        .id(usuario.getId())
        .email(usuario.getEmail())
        .nome(usuario.getNome())
        .build();
  }
}
