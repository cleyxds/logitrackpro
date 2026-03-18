package com.cleyxds.logitrackpro.service;

import com.cleyxds.logitrackpro.dto.VeiculoOptionResponse;
import com.cleyxds.logitrackpro.repository.VeiculoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VeiculoService {

  private final VeiculoRepository veiculoRepository;

  public VeiculoService(VeiculoRepository veiculoRepository) {
    this.veiculoRepository = veiculoRepository;
  }

  @Transactional(readOnly = true)
  public List<VeiculoOptionResponse> findAll() {
    return veiculoRepository.findAll().stream()
        .map(veiculo -> new VeiculoOptionResponse(
            veiculo.getId(),
            veiculo.getPlaca(),
            veiculo.getModelo(),
            veiculo.getTipo().name()))
        .toList();
  }
}
