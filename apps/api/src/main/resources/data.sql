INSERT INTO veiculos (placa, modelo, tipo, ano)
VALUES
  ('ABC-1234', 'Fiorino', 'LEVE', 2022),
  ('XYZ-9876', 'Volvo FH', 'PESADO', 2021),
  ('KJG-1122', 'Mercedes Sprinter', 'LEVE', 2020),
  ('LMN-4455', 'Scania R500', 'PESADO', 2023)
ON CONFLICT (placa) DO NOTHING;

-- Inserindo Viagens (Para testar o Dashboard)
INSERT INTO viagens (veiculo_id, data_saida, data_chegada, origem, destino, km_percorrida)
SELECT v.id, payload.data_saida, payload.data_chegada, payload.origem, payload.destino, payload.km_percorrida
FROM (
  VALUES
    ('ABC-1234', '2024-05-01 08:00:00'::timestamp, '2024-05-01 18:00:00'::timestamp, 'São Paulo', 'Rio de Janeiro', 435.00::decimal),
    ('ABC-1234', '2024-05-05 09:00:00'::timestamp, '2024-05-05 12:00:00'::timestamp, 'Rio de Janeiro', 'Niterói', 20.50::decimal),
    ('XYZ-9876', '2024-05-02 05:00:00'::timestamp, '2024-05-03 20:00:00'::timestamp, 'Curitiba', 'Belo Horizonte', 1000.00::decimal)
) AS payload(placa, data_saida, data_chegada, origem, destino, km_percorrida)
JOIN veiculos v ON v.placa = payload.placa
WHERE NOT EXISTS (
  SELECT 1
  FROM viagens viagem
  WHERE viagem.veiculo_id = v.id
    AND viagem.data_saida = payload.data_saida
    AND viagem.origem = payload.origem
    AND viagem.destino = payload.destino
);

-- Inserindo Manutenções (Para testar o Cronograma e Custos)
INSERT INTO manutencoes (veiculo_id, data_inicio, data_finalizacao, tipo_servico, custo_estimado, status)
SELECT v.id, payload.data_inicio, payload.data_finalizacao, payload.tipo_servico, payload.custo_estimado, payload.status
FROM (
  VALUES
    ('ABC-1234', '2024-06-10'::date, '2024-06-11'::date, 'Troca de Óleo', 350.00::decimal, 'PENDENTE'),
    ('XYZ-9876', '2024-06-15'::date, '2024-06-17'::date, 'Revisão de Freios', 1500.00::decimal, 'PENDENTE'),
    ('KJG-1122', '2024-05-20'::date, '2024-05-20'::date, 'Troca de Pneus', 2200.00::decimal, 'CONCLUIDA')
) AS payload(placa, data_inicio, data_finalizacao, tipo_servico, custo_estimado, status)
JOIN veiculos v ON v.placa = payload.placa
WHERE NOT EXISTS (
  SELECT 1
  FROM manutencoes manutencao
  WHERE manutencao.veiculo_id = v.id
    AND manutencao.data_inicio = payload.data_inicio
    AND manutencao.tipo_servico = payload.tipo_servico
);
