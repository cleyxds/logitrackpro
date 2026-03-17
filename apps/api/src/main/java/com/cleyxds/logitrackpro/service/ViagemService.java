package com.cleyxds.logitrackpro.service;

import com.cleyxds.logitrackpro.domain.Veiculo;
import com.cleyxds.logitrackpro.domain.Viagem;
import com.cleyxds.logitrackpro.dto.ViagemRequest;
import com.cleyxds.logitrackpro.dto.ViagemResponse;
import com.cleyxds.logitrackpro.repository.VeiculoRepository;
import com.cleyxds.logitrackpro.repository.ViagemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ViagemService {

    private final ViagemRepository viagemRepository;
    private final VeiculoRepository veiculoRepository;

    public ViagemService(ViagemRepository viagemRepository, VeiculoRepository veiculoRepository) {
        this.viagemRepository = viagemRepository;
        this.veiculoRepository = veiculoRepository;
    }

    @Transactional(readOnly = true)
    public List<ViagemResponse> findAll() {
        return viagemRepository.findAll().stream()
            .map(this::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public ViagemResponse findById(Long id) {
        return viagemRepository.findById(id)
            .map(this::toResponse)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem nao encontrada"));
    }

    @Transactional
    public ViagemResponse create(ViagemRequest request) {
        validateDates(request);
        Veiculo veiculo = getVeiculoOrThrow(request.veiculoId());

        Viagem viagem = new Viagem();
        applyRequest(viagem, request, veiculo);

        return toResponse(viagemRepository.save(viagem));
    }

    @Transactional
    public ViagemResponse update(Long id, ViagemRequest request) {
        validateDates(request);

        Viagem viagem = viagemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem nao encontrada"));

        Veiculo veiculo = getVeiculoOrThrow(request.veiculoId());
        applyRequest(viagem, request, veiculo);

        return toResponse(viagemRepository.save(viagem));
    }

    @Transactional
    public void delete(Long id) {
        Viagem viagem = viagemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Viagem nao encontrada"));
        viagemRepository.delete(viagem);
    }

    private Veiculo getVeiculoOrThrow(Long veiculoId) {
        return veiculoRepository.findById(veiculoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Veiculo selecionado nao existe"));
    }

    private void validateDates(ViagemRequest request) {
        if (!request.dataChegada().isAfter(request.dataSaida())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Data/Hora de chegada deve ser maior que a data/hora de saida"
            );
        }
    }

    private void applyRequest(Viagem viagem, ViagemRequest request, Veiculo veiculo) {
        viagem.setVeiculo(veiculo);
        viagem.setDataSaida(request.dataSaida());
        viagem.setDataChegada(request.dataChegada());
        viagem.setOrigem(request.origem().trim());
        viagem.setDestino(request.destino().trim());
        viagem.setKmPercorrida(request.kmPercorrida());
    }

    private ViagemResponse toResponse(Viagem viagem) {
        return new ViagemResponse(
            viagem.getId(),
            viagem.getVeiculo().getId(),
            viagem.getVeiculo().getPlaca(),
            viagem.getDataSaida(),
            viagem.getDataChegada(),
            viagem.getOrigem(),
            viagem.getDestino(),
            viagem.getKmPercorrida()
        );
    }
}
