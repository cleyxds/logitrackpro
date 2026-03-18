package com.cleyxds.logitrackpro.repository;

import com.cleyxds.logitrackpro.domain.Manutencao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long>, ManutencaoRepositoryCustom {
}