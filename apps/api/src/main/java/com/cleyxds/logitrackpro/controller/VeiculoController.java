package com.cleyxds.logitrackpro.controller;

import com.cleyxds.logitrackpro.dto.VeiculoOptionResponse;
import com.cleyxds.logitrackpro.repository.VeiculoRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(origins = "*")
public class VeiculoController {

    private final VeiculoRepository veiculoRepository;

    public VeiculoController(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    @GetMapping()
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
