package com.cleyxds.logitrackpro.controller;

import com.cleyxds.logitrackpro.dto.VeiculoOptionResponse;
import com.cleyxds.logitrackpro.service.VeiculoService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VeiculoController {
    private final VeiculoService veiculoService;

    @GetMapping()
    public List<VeiculoOptionResponse> findAll() {
        return veiculoService.findAll();
    }
}
