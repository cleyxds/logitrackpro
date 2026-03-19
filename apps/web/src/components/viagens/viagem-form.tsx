import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import { routes } from "../../constants/routes"
import { api, api_routes, viagemService } from "../../services/api"

import styles from "./viagens.module.css"

function toDatetimeLocal(iso: string) {
  return iso.slice(0, 16)
}

function toISO(datetimeLocal: string) {
  return datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal
}

type FormValues = {
  veiculoId: string
  dataSaida: string
  dataChegada: string
  origem: string
  destino: string
  kmPercorrida: string
}

const emptyForm: FormValues = {
  veiculoId: "",
  dataSaida: "",
  dataChegada: "",
  origem: "",
  destino: "",
  kmPercorrida: "",
}

function fromTrip(trip: Trip): FormValues {
  return {
    veiculoId: String(trip.veiculoId),
    dataSaida: toDatetimeLocal(trip.dataSaida),
    dataChegada: toDatetimeLocal(trip.dataChegada),
    origem: trip.origem,
    destino: trip.destino,
    kmPercorrida: String(trip.kmPercorrida),
  }
}

const validationSchema = Yup.object({
  veiculoId: Yup.string().required("Selecione um veículo."),
  dataSaida: Yup.string().required("Informe a data/hora de saída."),
  dataChegada: Yup.string()
    .required("Informe a data/hora de chegada.")
    .test("after-saida", "A chegada deve ser posterior à saída.", function (dataChegada) {
      const { dataSaida } = this.parent as FormValues
      if (!dataSaida || !dataChegada) return true
      return new Date(dataChegada) > new Date(dataSaida)
    }),
  origem: Yup.string().trim().required("Informe a cidade de origem."),
  destino: Yup.string().trim().required("Informe a cidade de destino."),
  kmPercorrida: Yup.number()
    .typeError("Informe um número válido.")
    .min(0.01, "A quilometragem deve ser maior que 0.")
    .required("Informe a quilometragem percorrida."),
})

type FormContentProps = {
  isEdit: boolean
  id: string | undefined
  initialData: Trip | undefined
  vehicles: Vehicle[]
}

function ViagemFormContent({ isEdit, id, initialData, vehicles }: FormContentProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: (data: TripRequest) =>
      isEdit ? viagemService.update(Number(id), data) : viagemService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      if (isEdit) queryClient.invalidateQueries({ queryKey: ["trip", id] })
      navigate(routes.viagens.base)
    },
  })

  const initialValues: FormValues = initialData ? fromTrip(initialData) : emptyForm

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Link className={styles.backLink} to={routes.viagens.base}>
              ← Voltar para Viagens
            </Link>
            <h1 className={styles.title}>{isEdit ? "Editar Viagem" : "Nova Viagem"}</h1>
            <p className={styles.description}>
              {isEdit
                ? "Atualize os dados da viagem selecionada."
                : "Cadastre uma nova viagem para a frota."}
            </p>
          </div>
        </header>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values) => {
            saveMutation.mutate({
              veiculoId: Number(values.veiculoId),
              dataSaida: toISO(values.dataSaida),
              dataChegada: toISO(values.dataChegada),
              origem: values.origem.trim(),
              destino: values.destino.trim(),
              kmPercorrida: Number(values.kmPercorrida),
            })
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.formCard} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="veiculoId">
                  Veículo
                </label>
                <Field
                  as="select"
                  id="veiculoId"
                  name="veiculoId"
                  className={`${styles.input} ${errors.veiculoId && touched.veiculoId ? styles.inputError : ""}`}
                >
                  <option value="">Selecione um veículo...</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={String(v.id)}>
                      {v.placa} • {v.modelo} ({v.tipo})
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="veiculoId"
                  component="span"
                  className={styles.fieldError}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="dataSaida">
                    Data/Hora de Saída
                  </label>
                  <Field
                    id="dataSaida"
                    name="dataSaida"
                    type="datetime-local"
                    className={`${styles.input} ${errors.dataSaida && touched.dataSaida ? styles.inputError : ""}`}
                  />
                  <ErrorMessage
                    name="dataSaida"
                    component="span"
                    className={styles.fieldError}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="dataChegada">
                    Data/Hora de Chegada
                  </label>
                  <Field
                    id="dataChegada"
                    name="dataChegada"
                    type="datetime-local"
                    className={`${styles.input} ${errors.dataChegada && touched.dataChegada ? styles.inputError : ""}`}
                  />
                  <ErrorMessage
                    name="dataChegada"
                    component="span"
                    className={styles.fieldError}
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="origem">
                    Cidade de Origem
                  </label>
                  <Field
                    id="origem"
                    name="origem"
                    type="text"
                    className={`${styles.input} ${errors.origem && touched.origem ? styles.inputError : ""}`}
                    placeholder="Ex: São Paulo"
                  />
                  <ErrorMessage
                    name="origem"
                    component="span"
                    className={styles.fieldError}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="destino">
                    Cidade de Destino
                  </label>
                  <Field
                    id="destino"
                    name="destino"
                    type="text"
                    className={`${styles.input} ${errors.destino && touched.destino ? styles.inputError : ""}`}
                    placeholder="Ex: Curitiba"
                  />
                  <ErrorMessage
                    name="destino"
                    component="span"
                    className={styles.fieldError}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="kmPercorrida">
                  Quilometragem Percorrida
                </label>
                <Field
                  id="kmPercorrida"
                  name="kmPercorrida"
                  type="number"
                  min="0.01"
                  step="0.1"
                  className={`${styles.input} ${errors.kmPercorrida && touched.kmPercorrida ? styles.inputError : ""}`}
                  placeholder="Ex: 432.5"
                />
                <ErrorMessage
                  name="kmPercorrida"
                  component="span"
                  className={styles.fieldError}
                />
              </div>

              {saveMutation.isError && (
                <div className={styles.formError}>
                  Erro ao salvar a viagem. Verifique os dados e tente novamente.
                </div>
              )}

              <div className={styles.formActions}>
                <Link className={styles.cancelButton} to={routes.viagens.base}>
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending
                    ? "Salvando..."
                    : isEdit
                      ? "Salvar alterações"
                      : "Cadastrar viagem"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default function ViagemForm() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await api.get<Vehicle[]>(api_routes.veiculos)
      return response.data
    },
  })

  const tripQuery = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => {
      const response = await viagemService.findById(Number(id))
      return response.data
    },
    enabled: isEdit,
  })

  if (isEdit && tripQuery.isPending) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.loading}>Carregando viagem...</div>
        </div>
      </main>
    )
  }

  if (isEdit && tripQuery.isError) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.error}>
            Nao foi possivel carregar os dados da viagem para edicao.
          </div>
        </div>
      </main>
    )
  }

  return (
    <ViagemFormContent
      key={id ?? "new"}
      isEdit={isEdit}
      id={id}
      initialData={tripQuery.data}
      vehicles={vehiclesQuery.data ?? []}
    />
  )
}
