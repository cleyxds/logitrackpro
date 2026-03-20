package com.cleyxds.logitrackpro.controller;

import com.cleyxds.logitrackpro.dto.ViagemRequest;
import com.cleyxds.logitrackpro.dto.ViagemResponse;
import com.cleyxds.logitrackpro.service.ViagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/viagens")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ViagemController {
    private final ViagemService viagemService;

    @GetMapping
    public List<ViagemResponse> findAll() {
        return viagemService.findAll();
    }

    @GetMapping("/{id}")
    public ViagemResponse findById(@PathVariable Long id) {
        return viagemService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ViagemResponse create(@Valid @RequestBody ViagemRequest request) {
        return viagemService.create(request);
    }

    @PutMapping("/{id}")
    public ViagemResponse update(@PathVariable Long id, @Valid @RequestBody ViagemRequest request) {
        return viagemService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        viagemService.delete(id);
    }
}
