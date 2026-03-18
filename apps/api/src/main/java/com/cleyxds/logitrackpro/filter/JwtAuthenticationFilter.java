package com.cleyxds.logitrackpro.filter;

import com.cleyxds.logitrackpro.domain.Usuario;
import com.cleyxds.logitrackpro.repository.UsuarioRepository;
import com.cleyxds.logitrackpro.util.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final JwtTokenProvider jwtTokenProvider;
  private final UsuarioRepository usuarioRepository;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    String token = extractToken(request);

    if (token != null && jwtTokenProvider.validateToken(token)) {
      String username = jwtTokenProvider.extractUsername(token);
      Usuario usuario = usuarioRepository.findByEmail(username).orElse(null);

      if (usuario != null) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            usuario,
            null,
            usuario.getAuthorities());
        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    }

    filterChain.doFilter(request, response);
  }

  private String extractToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
