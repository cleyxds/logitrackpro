package com.cleyxds.logitrackpro.service;

import com.cleyxds.logitrackpro.domain.Usuario;
import com.cleyxds.logitrackpro.dto.AuthResponse;
import com.cleyxds.logitrackpro.dto.LoginRequest;
import com.cleyxds.logitrackpro.dto.RegisterRequest;
import com.cleyxds.logitrackpro.dto.UsuarioResponse;
import com.cleyxds.logitrackpro.repository.UsuarioRepository;
import com.cleyxds.logitrackpro.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UsuarioRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthResponse login(LoginRequest request) {
    Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
      throw new RuntimeException("Senha inválida");
    }

    String token = jwtTokenProvider.generateToken(usuario);
    String refresh = jwtTokenProvider.generateRefreshToken(usuario);

    return AuthResponse.builder()
        .access_token(token)
        .refresh_token(refresh)
        .user(UsuarioResponse.fromEntity(usuario))
        .build();
  }

  public AuthResponse register(RegisterRequest request) {
    if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new RuntimeException("Email já cadastrado");
    }

    Usuario usuario = Usuario.builder()
        .email(request.getEmail())
        .senha(passwordEncoder.encode(request.getPassword()))
        .nome(request.getNome())
        .build();

    usuario = usuarioRepository.save(usuario);
    String token = jwtTokenProvider.generateToken(usuario);
    String refresh = jwtTokenProvider.generateRefreshToken(usuario);

    return AuthResponse.builder()
        .access_token(token)
        .refresh_token(refresh)
        .user(UsuarioResponse.fromEntity(usuario))
        .build();
  }

  public AuthResponse refresh(String refreshToken) {
    if (!jwtTokenProvider.validateToken(refreshToken)) {
      throw new RuntimeException("Refresh token inválido ou expirado");
    }

    String username = jwtTokenProvider.extractUsername(refreshToken);
    Usuario usuario = usuarioRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado para refresh"));

    String token = jwtTokenProvider.generateToken(usuario);
    String newRefresh = jwtTokenProvider.generateRefreshToken(usuario);

    return AuthResponse.builder()
        .access_token(token)
        .refresh_token(newRefresh)
        .user(UsuarioResponse.fromEntity(usuario))
        .build();
  }
}
