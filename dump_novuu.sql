--
-- PostgreSQL database dump
--

\restrict 6mfcHWP38gdOJhLGBBKrnYWuvlF409CDE9J1b4c43A44rZEZTMgWRk6A5GBsM2m

-- Dumped from database version 15.18 (Debian 15.18-1.pgdg13+1)
-- Dumped by pg_dump version 15.18 (Debian 15.18-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT f_k_users_construtoras_construtora_id;
ALTER TABLE ONLY public.unidades DROP CONSTRAINT f_k_unidades_torres_torre_id;
ALTER TABLE ONLY public.unidades DROP CONSTRAINT f_k_unidades_quadras_quadra_id;
ALTER TABLE ONLY public.unidades DROP CONSTRAINT f_k_unidades_andares_andar_id;
ALTER TABLE ONLY public.torres DROP CONSTRAINT f_k_torres_empreendimentos_empreendimento_id;
ALTER TABLE ONLY public.tabela_vendas_baloes DROP CONSTRAINT f_k_tabela_vendas_baloes_tabela_vendas_tabela_vendas_id;
ALTER TABLE ONLY public.quadras DROP CONSTRAINT f_k_quadras_empreendimentos_empreendimento_id;
ALTER TABLE ONLY public.propostas_vagas DROP CONSTRAINT f_k_propostas_vagas_propostas_proposta_id;
ALTER TABLE ONLY public.propostas_vagas DROP CONSTRAINT f_k_propostas_vagas_garagens_garagem_id;
ALTER TABLE ONLY public.propostas DROP CONSTRAINT f_k_propostas_clientes_cliente_id;
ALTER TABLE ONLY public.propostas_baloes DROP CONSTRAINT f_k_propostas_baloes_propostas_proposta_id;
ALTER TABLE ONLY public.propostas DROP CONSTRAINT f_k_propostas__unidades_unidade_id;
ALTER TABLE ONLY public.leads DROP CONSTRAINT f_k_leads_empreendimentos_empreendimento_id;
ALTER TABLE ONLY public.leads DROP CONSTRAINT f_k_leads_construtoras_construtora_id;
ALTER TABLE ONLY public.empreendimentos DROP CONSTRAINT f_k_empreendimentos_construtoras_construtora_id;
ALTER TABLE ONLY public.cidades DROP CONSTRAINT f_k_cidades__estados_estado_id;
ALTER TABLE ONLY public.bairros DROP CONSTRAINT f_k_bairros__cidades_cidade_id;
ALTER TABLE ONLY public.andares DROP CONSTRAINT f_k_andares__torres_torre_id;
DROP INDEX public.i_x_users_construtora_id;
DROP INDEX public.i_x_unidades_torre_id;
DROP INDEX public.i_x_unidades_quadra_id;
DROP INDEX public.i_x_unidades_andar_id;
DROP INDEX public.i_x_torres_empreendimento_id;
DROP INDEX public.i_x_tabela_vendas_baloes_tabela_vendas_id;
DROP INDEX public.i_x_quadras_empreendimento_id;
DROP INDEX public.i_x_propostas_vagas_proposta_id;
DROP INDEX public.i_x_propostas_vagas_garagem_id;
DROP INDEX public.i_x_propostas_unidade_id;
DROP INDEX public.i_x_propostas_cliente_id;
DROP INDEX public.i_x_propostas_baloes_proposta_id;
DROP INDEX public.i_x_leads_empreendimento_id;
DROP INDEX public.i_x_leads_construtora_id;
DROP INDEX public.i_x_empreendimentos_construtora_id;
DROP INDEX public.i_x_cidades_estado_id;
DROP INDEX public.i_x_bairros_cidade_id;
DROP INDEX public.i_x_andares_torre_id;
ALTER TABLE ONLY public.users DROP CONSTRAINT p_k_users;
ALTER TABLE ONLY public.unidades DROP CONSTRAINT p_k_unidades;
ALTER TABLE ONLY public.torres DROP CONSTRAINT p_k_torres;
ALTER TABLE ONLY public.tabela_vendas_baloes DROP CONSTRAINT p_k_tabela_vendas_baloes;
ALTER TABLE ONLY public.tabela_vendas DROP CONSTRAINT p_k_tabela_vendas;
ALTER TABLE ONLY public.quadras DROP CONSTRAINT p_k_quadras;
ALTER TABLE ONLY public.propostas_vagas DROP CONSTRAINT p_k_propostas_vagas;
ALTER TABLE ONLY public.propostas_baloes DROP CONSTRAINT p_k_propostas_baloes;
ALTER TABLE ONLY public.propostas DROP CONSTRAINT p_k_propostas;
ALTER TABLE ONLY public.leads DROP CONSTRAINT p_k_leads;
ALTER TABLE ONLY public.garagens DROP CONSTRAINT p_k_garagens;
ALTER TABLE ONLY public.fotos DROP CONSTRAINT p_k_fotos;
ALTER TABLE ONLY public.estados DROP CONSTRAINT p_k_estados;
ALTER TABLE ONLY public.enderecos DROP CONSTRAINT p_k_enderecos;
ALTER TABLE ONLY public.empreendimentos DROP CONSTRAINT p_k_empreendimentos;
ALTER TABLE ONLY public.construtoras DROP CONSTRAINT p_k_construtoras;
ALTER TABLE ONLY public.clientes DROP CONSTRAINT p_k_clientes;
ALTER TABLE ONLY public.cidades DROP CONSTRAINT p_k_cidades;
ALTER TABLE ONLY public.bairros DROP CONSTRAINT p_k_bairros;
ALTER TABLE ONLY public.andares DROP CONSTRAINT p_k_andares;
DROP TABLE public.users;
DROP TABLE public.unidades;
DROP TABLE public.torres;
DROP TABLE public.tabela_vendas_baloes;
DROP TABLE public.tabela_vendas;
DROP TABLE public.quadras;
DROP TABLE public.propostas_vagas;
DROP TABLE public.propostas_baloes;
DROP TABLE public.propostas;
DROP TABLE public.leads;
DROP TABLE public.garagens;
DROP TABLE public.fotos;
DROP TABLE public.estados;
DROP TABLE public.enderecos;
DROP TABLE public.empreendimentos;
DROP TABLE public.construtoras;
DROP TABLE public.clientes;
DROP TABLE public.cidades;
DROP TABLE public.bairros;
DROP TABLE public.andares;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: andares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.andares (
    id integer NOT NULL,
    construtora_id integer NOT NULL,
    torre_id integer NOT NULL,
    numero integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.andares OWNER TO postgres;

--
-- Name: andares_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.andares ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.andares_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: bairros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bairros (
    id integer NOT NULL,
    cidade_id integer NOT NULL,
    nome text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.bairros OWNER TO postgres;

--
-- Name: bairros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.bairros ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.bairros_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cidades (
    id integer NOT NULL,
    estado_id integer NOT NULL,
    nome text NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.cidades OWNER TO postgres;

--
-- Name: cidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cidades ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.cidades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome text NOT NULL,
    cpf text NOT NULL,
    data_nascimento timestamp with time zone,
    email text,
    telefone text,
    estado_civil text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.clientes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.clientes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: construtoras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.construtoras (
    id integer NOT NULL,
    nome text NOT NULL,
    nome_abreviado text,
    cnpj text,
    ano_fundacao integer,
    mes_fundacao integer,
    status text NOT NULL,
    valor_mensal numeric,
    acesso_domus boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.construtoras OWNER TO postgres;

--
-- Name: construtoras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.construtoras ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.construtoras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: empreendimentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empreendimentos (
    id integer NOT NULL,
    construtora_id integer NOT NULL,
    nome text NOT NULL,
    descricao text,
    tipo text NOT NULL,
    valor_inicial numeric,
    valor_final numeric,
    previsao_entrega text,
    qtde_torre integer NOT NULL,
    qtde_quadra integer NOT NULL,
    latitude numeric,
    longitude numeric,
    status text NOT NULL,
    gerou_unidades boolean NOT NULL,
    logomarca text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.empreendimentos OWNER TO postgres;

--
-- Name: empreendimentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.empreendimentos ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.empreendimentos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: enderecos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enderecos (
    id integer NOT NULL,
    construtora_id integer,
    estado_id integer NOT NULL,
    cidade_id integer NOT NULL,
    bairro_id integer NOT NULL,
    cep text NOT NULL,
    logradouro text NOT NULL,
    complemento text,
    numero text,
    latitude numeric,
    longitude numeric,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.enderecos OWNER TO postgres;

--
-- Name: enderecos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.enderecos ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.enderecos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados (
    id integer NOT NULL,
    uf text NOT NULL,
    nome text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.estados OWNER TO postgres;

--
-- Name: estados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.estados ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.estados_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: fotos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fotos (
    id integer NOT NULL,
    construtora_id integer,
    empreendimento_id integer,
    planta_id integer,
    nome text,
    descricao text,
    arquivo text,
    extensao text,
    tipo text,
    status text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    destaque_principal text,
    destaque_carrossel text,
    destaque_planta text
);


ALTER TABLE public.fotos OWNER TO postgres;

--
-- Name: fotos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fotos ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.fotos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: garagens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.garagens (
    id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    construtora_id integer NOT NULL,
    torre_id integer,
    unidade_id integer,
    pavimento_garagem_id integer,
    nome text NOT NULL,
    situacao text NOT NULL,
    formato_vaga text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.garagens OWNER TO postgres;

--
-- Name: garagens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.garagens ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.garagens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leads (
    id integer NOT NULL,
    construtora_id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    nome text NOT NULL,
    email text,
    telefone text,
    mensagem text,
    previsao text,
    interesse text,
    renda text,
    dispositivo text,
    origem text,
    tempo text,
    status text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.leads OWNER TO postgres;

--
-- Name: leads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.leads ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.leads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: propostas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.propostas (
    id integer NOT NULL,
    construtora_id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    unidade_id integer NOT NULL,
    oferta_id integer,
    cliente_id integer NOT NULL,
    valor_proposta numeric NOT NULL,
    entrada_proposta numeric NOT NULL,
    quantidade_parcela integer,
    valor_parcela numeric,
    saldo_remanescente numeric,
    valor_bens numeric,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.propostas OWNER TO postgres;

--
-- Name: propostas_baloes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.propostas_baloes (
    id integer NOT NULL,
    proposta_id integer NOT NULL,
    valor numeric NOT NULL,
    data timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.propostas_baloes OWNER TO postgres;

--
-- Name: propostas_baloes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.propostas_baloes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.propostas_baloes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: propostas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.propostas ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.propostas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: propostas_vagas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.propostas_vagas (
    id integer NOT NULL,
    proposta_id integer NOT NULL,
    garagem_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.propostas_vagas OWNER TO postgres;

--
-- Name: propostas_vagas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.propostas_vagas ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.propostas_vagas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: quadras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quadras (
    id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    nome text NOT NULL,
    total_unidades integer NOT NULL,
    previsao_entrega text,
    nomenclatura text,
    observacoes text,
    status text NOT NULL,
    gerou_unidades boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.quadras OWNER TO postgres;

--
-- Name: quadras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.quadras ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.quadras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tabela_vendas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabela_vendas (
    id integer NOT NULL,
    nome text NOT NULL,
    construtora_id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    torre_id integer,
    quadra_id integer,
    tipo_tabela_id integer NOT NULL,
    valor_vaga_extra numeric,
    qtde_parcelas_entrada integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.tabela_vendas OWNER TO postgres;

--
-- Name: tabela_vendas_baloes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabela_vendas_baloes (
    id integer NOT NULL,
    tabela_vendas_id integer NOT NULL,
    percentual_balao numeric NOT NULL,
    data_balao timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.tabela_vendas_baloes OWNER TO postgres;

--
-- Name: tabela_vendas_baloes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tabela_vendas_baloes ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tabela_vendas_baloes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tabela_vendas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tabela_vendas ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tabela_vendas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: torres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.torres (
    id integer NOT NULL,
    nome text NOT NULL,
    construtora_id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    previsao_entrega text,
    etapa text,
    status text NOT NULL,
    observacoes text,
    previsao_entrega_ano integer,
    previsao_entrega_mes integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.torres OWNER TO postgres;

--
-- Name: torres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.torres ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.torres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: unidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidades (
    id integer NOT NULL,
    construtora_id integer NOT NULL,
    empreendimento_id integer NOT NULL,
    torre_id integer,
    quadra_id integer,
    andar_id integer,
    planta_id integer,
    nome text NOT NULL,
    situacao text NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.unidades OWNER TO postgres;

--
-- Name: unidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.unidades ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.unidades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    data_nascimento timestamp with time zone,
    foto_perfil text,
    celular text,
    telefone_fixo text,
    whatsapp text,
    perfil_profissional text,
    construtora_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: andares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.andares (id, construtora_id, torre_id, numero, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: bairros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bairros (id, cidade_id, nome, created_at, updated_at, deleted_at) FROM stdin;
1	1	Centro-Sul	2026-07-20 13:49:40.958327+00	\N	\N
2	1	Bosque da Saúde	2026-07-20 13:49:40.958357+00	\N	\N
3	1	Jardim Aclimação	2026-07-20 13:49:40.958357+00	\N	\N
4	1	Jardim das Américas	2026-07-20 13:49:40.958357+00	\N	\N
5	1	Goiabeiras	2026-07-20 13:49:40.958357+00	\N	\N
6	1	Quilombo	2026-07-20 13:49:40.958358+00	\N	\N
7	1	Santa Rosa	2026-07-20 13:49:40.958359+00	\N	\N
8	1	Popular	2026-07-20 13:49:40.958359+00	\N	\N
9	1	Alvorada	2026-07-20 13:49:40.958359+00	\N	\N
10	1	Boa Esperança	2026-07-20 13:49:40.958359+00	\N	\N
11	1	Jardim Itália	2026-07-20 13:49:40.958359+00	\N	\N
12	1	Morada do Ouro	2026-07-20 13:49:40.958359+00	\N	\N
13	1	Coxipó	2026-07-20 13:49:40.958359+00	\N	\N
14	2	Centro	2026-07-20 13:49:40.958379+00	\N	\N
15	2	Jardim Aeroporto	2026-07-20 13:49:40.958379+00	\N	\N
16	2	Cristo Rei	2026-07-20 13:49:40.958379+00	\N	\N
17	2	Jardim Glória	2026-07-20 13:49:40.958379+00	\N	\N
18	2	Nova Várzea Grande	2026-07-20 13:49:40.958379+00	\N	\N
19	2	Mapim	2026-07-20 13:49:40.958379+00	\N	\N
\.


--
-- Data for Name: cidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cidades (id, estado_id, nome, status, created_at, updated_at, deleted_at) FROM stdin;
1	1	Cuiabá	L	2026-07-20 13:49:40.898181+00	\N	\N
2	1	Várzea Grande	L	2026-07-20 13:49:40.89831+00	\N	\N
3	1	Rondonópolis	L	2026-07-20 13:49:40.89831+00	\N	\N
4	1	Sinop	L	2026-07-20 13:49:40.89831+00	\N	\N
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nome, cpf, data_nascimento, email, telefone, estado_civil, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: construtoras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.construtoras (id, nome, nome_abreviado, cnpj, ano_fundacao, mes_fundacao, status, valor_mensal, acesso_domus, created_at, updated_at, deleted_at) FROM stdin;
1	Plaenge Empreendimentos	Plaenge	00.000.000/0001-00	\N	\N	Liberada	\N	t	2026-07-20 13:49:40.990281+00	\N	\N
2	Ginco Urbanismo	Ginco	11.111.111/0001-11	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990367+00	\N	\N
3	MRV Engenharia	MRV	22.222.222/0001-22	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990367+00	\N	\N
4	São Benedito	São Benedito	33.333.333/0001-33	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990367+00	\N	\N
5	Vanguard Home	Vanguard	44.444.444/0001-44	\N	\N	Liberada	\N	t	2026-07-20 13:49:40.990367+00	\N	\N
6	Cyrela	Cyrela	55.555.555/0001-55	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990369+00	\N	\N
7	Gafisa	Gafisa	66.666.666/0001-66	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990369+00	\N	\N
8	Tenda	Tenda	77.777.777/0001-77	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990369+00	\N	\N
9	Direcional	Direcional	88.888.888/0001-88	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990369+00	\N	\N
10	Even	Even	99.999.999/0001-99	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.990369+00	\N	\N
11	Gerencial Construtora	Gerencial	12.345.678/0001-10	\N	\N	Liberada	\N	f	2026-07-20 13:49:40.99037+00	\N	\N
\.


--
-- Data for Name: empreendimentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empreendimentos (id, construtora_id, nome, descricao, tipo, valor_inicial, valor_final, previsao_entrega, qtde_torre, qtde_quadra, latitude, longitude, status, gerou_unidades, logomarca, created_at, updated_at, deleted_at) FROM stdin;
1	2	Plaza Lumina Saraiva	Deserunt ut odit temporibus repellendus qui nulla consequatur error architecto. Odit consequuntur qui omnis aut quia molestiae nulla doloremque assumenda. Autem enim iusto. Earum repudiandae nostrum minus vel enim error.\n\nEveniet aut quam aut iusto ullam sed quia commodi. Ea officiis ea at rem enim beatae tempore necessitatibus. Fugiat consequatur dolor omnis possimus reiciendis. Accusamus quia dicta repellendus qui et minus aut. Temporibus inventore nobis in aut optio non sunt facere dolorum.	Horizontal	800025	1701006	Entregue	0	15	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.090071+00	\N	\N
2	8	Spazio Di Roma Nogueira	Molestiae voluptatum ea vel dignissimos eius non. Ut nobis qui ut eveniet aliquam quam ea. Quae sed officia ab natus eos cumque id.\n\nQuo laboriosam non. Omnis nostrum similique et eos et ex. Voluptate incidunt porro nesciunt rem rem. Amet neque fuga aliquid. Odit molestiae quo. Et eos maxime et nihil.	Loteamento	257718	380278	Pronto	0	8	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.091753+00	\N	\N
3	9	Condomínio das Flores Martins	Eveniet sit consequatur dolorem. Nulla reprehenderit corrupti quia et vel reiciendis accusantium voluptatum ut. Rem expedita voluptatem dicta molestias rem repellendus similique est doloribus. Exercitationem ipsum maxime. Minima omnis laboriosam itaque similique ab quaerat qui temporibus. Id sed nihil voluptate nihil.\n\nItaque autem saepe et saepe quisquam. Provident sint beatae quasi qui dignissimos voluptas et ratione. Nihil dignissimos architecto deleniti ut ea tempore nostrum sed dolorem. Sed quaerat accusamus est in molestias qui. Rerum odio qui doloremque expedita accusantium necessitatibus qui aut accusantium. Et assumenda nam veniam atque.	Horizontal	1726866	2186879	12/2027	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.095585+00	\N	\N
4	5	Parque Garden Carvalho	Quaerat voluptatem ipsam odit quisquam quasi aliquid veritatis ipsa et. Nisi quo sit ut. Quaerat quaerat minus rerum. Officia repudiandae quidem delectus omnis temporibus ut rem nostrum. Iste qui exercitationem velit harum earum voluptatem. Eveniet quidem laborum sunt nesciunt voluptatibus illum et sint.\n\nQuisquam incidunt est provident expedita veritatis ratione voluptatibus amet tenetur. Aut molestiae nam. Vero voluptatem officia velit ipsa voluptatem facere. Ex porro occaecati sit vel doloribus esse deserunt sed. Qui odio et nemo dolores.	Loteamento	278490	411123	02/2027	0	12	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.095719+00	\N	\N
5	5	Plaza Unique Barros	Debitis beatae debitis nobis molestias culpa et qui et sed. Illum eos illo sunt. Voluptatem facilis aut rerum est rerum laborum eligendi sapiente vitae.\n\nEum ducimus aut fuga odio. Qui voluptas aspernatur tempora doloribus eum. Aspernatur laboriosam quam commodi voluptates. Inventore quis natus maiores aliquam. Autem nisi repellat reprehenderit. Dolores vel doloribus molestiae totam quia dolorem tempore accusantium.	Loteamento	101448	206683	08/2027	0	12	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.095755+00	\N	\N
6	3	Edifício Vision Franco	Corporis sit quas aut repellendus quod perferendis illum. Voluptates nam qui illo sunt dolorem autem nisi rerum. Occaecati tempore et eius error. Id explicabo eaque hic assumenda sunt excepturi voluptate voluptates fugit. Quasi amet mollitia qui quia dolore et.\n\nAperiam laborum vitae vero officia. Sit est exercitationem culpa et alias eum. Ut nemo qui consequatur voluptas nulla aut est non. Sunt provident accusantium alias labore sit.	Loteamento	293161	488248	Pronto	0	5	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.095784+00	\N	\N
7	11	Jardim do Sol Carvalho	Consequatur est incidunt perspiciatis deleniti deserunt. Maxime facere et aspernatur culpa eveniet ea fuga quis cupiditate. Voluptas tempore autem necessitatibus.\n\nVoluptate quos similique doloribus nulla quo voluptatibus. Debitis ut dignissimos eum. Omnis veritatis nam temporibus delectus.	Vertical	1082569	2553494	Entregue	3	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.095814+00	\N	\N
8	8	Torre Natura Macedo	Omnis officia accusantium. At quasi nisi quibusdam suscipit. Odio et quibusdam sint quasi. Commodi sunt et dicta hic expedita unde.\n\nSequi magni sunt assumenda quia unde et vero quod. Culpa quidem voluptatibus porro ea. Eius quo eveniet. In quae eos amet.	Loteamento	250704	414628	04/2028	0	9	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.095841+00	\N	\N
9	10	Spazio Garden Nogueira	Et vel sed et cum. Ut ea quaerat earum temporibus labore. Ullam et odit est ut laboriosam. Eligendi beatae repellendus aliquid maiores maiores. Deleniti sint rem eum ea.\n\nQui voluptates magni placeat. Unde soluta odit a deserunt. Provident sit ut deleniti mollitia occaecati aut repellat ea. In quo ullam occaecati.	Horizontal	621139	2072957	Entregue	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.095863+00	\N	\N
10	3	Plaza Garden Souza	Est eum suscipit eum alias maiores. Ipsa praesentium enim odit sapiente molestias voluptatem corporis quisquam. Ut magni est. Rerum enim quia consequuntur voluptate eum id et repudiandae consequuntur.\n\nQuae dolor aut quia nihil quia corrupti necessitatibus sed soluta. Enim rem quis dolor voluptatem culpa. Minima animi minima est similique dolorem. Ullam qui dicta cumque. Neque id dolor.	Horizontal	764846	1131489	Entregue	0	3	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.095925+00	\N	\N
11	1	Residencial Acqua Costa	Omnis minima deleniti nihil tempore est a. Aut dolorem ut deleniti provident omnis aut delectus. Quibusdam aut sapiente aut. Ipsum eaque molestias.\n\nEnim est voluptas. Dolorem porro quia. Error ut molestias nihil illo autem quod. Dignissimos quasi voluptas consectetur labore ipsam amet rerum. Unde laborum odio quo unde dolorem cumque ea porro. Possimus reprehenderit ullam deserunt repellat.	Vertical	1043444	2071514	05/2029	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.095958+00	\N	\N
12	1	Parque Bela Vista Carvalho	Fuga sunt amet. Dolorum excepturi qui eum. Quam earum atque ut in omnis amet eos. Incidunt quia at animi illo enim voluptatem reprehenderit. Tenetur dicta possimus ut deleniti repellat ipsam recusandae numquam incidunt.\n\nConsequatur est fuga quia sapiente eligendi. Esse quis blanditiis. Officia esse placeat cupiditate tempora fugit. Hic vel aliquid a animi vel. Cumque nulla dolorum fugiat tenetur architecto est incidunt deleniti tenetur. Qui veritatis qui qui perspiciatis harum aut necessitatibus et non.	Vertical	839643	1589712	03/2028	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.095983+00	\N	\N
13	5	Spazio Bravie Nogueira	Ipsa aliquam maiores omnis placeat dolorum voluptatem consequatur. Qui necessitatibus totam et ipsam. Veritatis hic corporis exercitationem reiciendis est aut sit natus. Ullam saepe pariatur harum ut deserunt incidunt ullam necessitatibus. Molestias aperiam quia aperiam rerum voluptate.\n\nCommodi magnam accusantium aliquid asperiores laborum. Inventore sunt sit quisquam. Doloribus vero magnam voluptatem.	Loteamento	207570	333798	03/2029	0	9	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.096016+00	\N	\N
14	3	Complexo Unique Carvalho	Nisi molestias harum impedit ipsum blanditiis officia minus eos. Qui at vel facere odio commodi iure velit deleniti nam. Nesciunt repudiandae omnis hic esse odit sequi sit tempore modi. Labore adipisci vel quisquam ea quia autem repellendus beatae. Non ut vel.\n\nOdit quas ut repudiandae quaerat ut iure quis. Esse aspernatur occaecati. Nostrum ut facere accusamus nisi temporibus. Rem qui similique consequuntur harum voluptates possimus.	Loteamento	211241	316923	03/2029	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096036+00	\N	\N
117	3	Plaza Di Roma Albuquerque	In voluptatum ut possimus quas. Enim ut rem eius sequi id. Unde in quis amet vel suscipit voluptas.\n\nCupiditate sed eos consequatur omnis incidunt in tempora. Nulla qui similique nobis. Placeat est fugit beatae et autem beatae at ab odio.	Horizontal	1784188	2937742	05/2028	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11144+00	\N	\N
15	5	Edifício Natura Batista	Culpa error vitae porro itaque earum animi consequatur dolor. Voluptatem voluptatem ea. Error soluta repellat molestias debitis asperiores qui temporibus laboriosam. Excepturi quaerat commodi neque quia optio provident voluptatem. Ipsa velit enim consequatur eveniet alias quidem. Impedit vero facilis quasi.\n\nDolor reiciendis in molestiae totam architecto excepturi eius quo error. Quia labore error. Voluptate voluptatem officia est. Possimus nisi enim culpa error quaerat molestiae. Veniam excepturi fuga minus illum sint hic quia. Provident tenetur quasi.	Horizontal	1954828	3428900	09/2026	0	8	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096067+00	\N	\N
16	7	Ville Acqua Melo	Ut id cum in deserunt mollitia deleniti provident modi. Ut nihil quidem non. Et nihil repudiandae veritatis fugiat. Est molestiae vero enim suscipit quod saepe dolorem. Et suscipit odit occaecati temporibus autem et reiciendis et consequatur.\n\nVelit possimus nesciunt. Maiores vitae officiis voluptas impedit qui consequatur. Minus sed dignissimos aut. Facilis sequi hic ea qui id. Delectus et nemo architecto dignissimos sint ea vel et. Non sunt distinctio.	Vertical	407766	815953	10/2026	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096131+00	\N	\N
17	11	Residencial Central Carvalho	Porro illo tempora sapiente doloremque quo velit quasi. Veniam blanditiis itaque. Fugiat aut sunt eum sed veritatis explicabo quisquam in minima.\n\nAlias impedit enim aut nesciunt. Omnis reiciendis officia. Sed eos corrupti quidem mollitia quos rerum quod velit hic. Velit quam voluptatem est error excepturi nesciunt voluptas et aut. Ipsam provident sit praesentium.	Horizontal	1532327	2423585	Pronto	0	2	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.096162+00	\N	\N
18	2	Condomínio Imperial Melo	Et et id magni delectus. Sed perferendis magnam rerum eius a et est sunt voluptatem. Harum tenetur et ea veniam maxime consequatur vel. Distinctio adipisci tempora voluptatum commodi dignissimos ut.\n\nHic aspernatur qui magni quisquam et dicta ut beatae facilis. Fuga dolor modi similique quia molestias. Blanditiis debitis et non nobis corrupti aut explicabo.	Vertical	523856	1043496	07/2029	2	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.096189+00	\N	\N
19	6	Parque Prime Reis	Exercitationem dolores repellat assumenda et provident. Officia explicabo ut voluptas est vel perferendis sunt praesentium explicabo. Rerum deleniti et voluptatem voluptas corporis. Et expedita ullam consequatur est qui voluptatem error. Optio quasi quis eum ab saepe quis.\n\nDolorem et nesciunt ducimus nulla. Quia et mollitia et amet deleniti incidunt error. Excepturi est odit. Consequatur laborum numquam et quidem. Molestiae deleniti a et. Exercitationem repudiandae neque sint doloribus facere facere aspernatur est.	Vertical	307463	709715	12/2027	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096211+00	\N	\N
20	6	Parque Vision Oliveira	Quo rerum sit rerum esse qui quos. Quod veniam sapiente cumque aut. Vel facilis ut odio iure qui quos qui. Ut nam assumenda ipsam beatae excepturi.\n\nDolor quae ea. Ad ipsam ratione molestias recusandae quos corporis. Quos voluptatem iusto dolor animi saepe est voluptate.	Loteamento	151878	210402	09/2026	0	9	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096237+00	\N	\N
21	10	Torre Exclusive Pereira	Eum quod autem soluta error unde. Quo animi facere aliquid maxime omnis et enim quam ipsam. In eum quidem.\n\nAb ipsa a assumenda deserunt. Delectus nisi ea. Eligendi velit nostrum. Eaque at voluptatem ut quia a voluptatem libero illo. Inventore quia voluptatem eius. Quibusdam veniam veritatis.	Horizontal	1190486	1729093	02/2028	0	15	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096262+00	\N	\N
22	4	Vila Oasis Souza	Quasi asperiores autem et aperiam est enim. Esse ut quod repellat omnis voluptas vero eum et. Repellendus est similique. Excepturi ea est cumque hic est. Eum quidem molestiae autem aliquid.\n\nQuibusdam similique quaerat enim. Illum necessitatibus quia repellendus fugit enim sed pariatur. Voluptatibus vel distinctio cupiditate enim a fugit. Qui odit sunt voluptas omnis ipsam repellat. Ipsa earum non fugit nostrum nulla dolor excepturi et quia. Voluptate eveniet architecto odio officiis dolores sunt non consequatur.	Horizontal	1302322	2111846	Pronto	0	15	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096282+00	\N	\N
23	1	Plaza Unique Barros	Eveniet nihil et. Est et recusandae molestias ullam. Ea neque error enim quod delectus nihil iste maxime. Aut nihil dicta voluptatum dicta natus. In aliquam consectetur consequatur recusandae omnis. Nemo quia est eum omnis et nihil voluptas accusantium libero.\n\nEx itaque molestias distinctio earum laboriosam voluptatem est magni ut. Quasi corporis placeat vel id saepe ut hic. Sed facere voluptatem accusamus non totam facere fugiat qui perferendis.	Loteamento	233314	412722	03/2029	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096343+00	\N	\N
24	1	Torre Lumina Saraiva	Labore aut tempora iusto similique suscipit dolorum beatae distinctio quos. Porro et suscipit eum omnis et ex recusandae. Deserunt eos maiores sit doloribus. Amet earum et. Ut ipsa maiores minima perferendis ea delectus. Quas est ut ipsam veniam.\n\nConsectetur consectetur nemo impedit. Saepe iste ad consequuntur quos nam dolor. Neque ut et.	Vertical	1183289	1424858	12/2026	3	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.09637+00	\N	\N
25	8	Parque Bravie Nogueira	Ratione libero quibusdam consectetur laborum. Nostrum perspiciatis nam omnis animi voluptatem impedit dolor. Illo non tempora commodi ipsum. Pariatur asperiores occaecati tempora dignissimos quas quae occaecati.\n\nVelit quos exercitationem ad nesciunt officiis qui nihil fuga. Tenetur commodi dolore ab provident molestiae. Qui vel vel a harum quibusdam cumque eos quo. Officiis quod animi ea inventore quod sapiente. Quaerat est est porro accusamus. Sit quia aspernatur vel in.	Horizontal	851142	1144309	09/2028	0	7	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096393+00	\N	\N
26	2	Torre Prime Moraes	Consequatur sed culpa quia. Molestiae sapiente nihil eos consequuntur consectetur vel omnis numquam nihil. Qui officia natus deleniti. Commodi mollitia tempore illo enim totam corrupti necessitatibus.\n\nCupiditate amet consequuntur enim. Laudantium adipisci quia eos. Ducimus quos eos aliquam. Nihil quis aliquam tempora. Rerum suscipit ex doloribus. Molestias nisi saepe nemo reprehenderit sit voluptatem.	Horizontal	1698534	2990259	12/2026	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096425+00	\N	\N
27	11	Condomínio Paradiso Carvalho	Natus cupiditate ut dolores. Non et voluptatem qui et perspiciatis. Libero culpa vel porro.\n\nMolestiae natus alias quos voluptas ab accusamus ex est incidunt. Doloremque nihil quae ducimus dolor rerum qui animi. Doloremque est molestiae atque ut non dolore recusandae tenetur exercitationem.	Loteamento	184918	384016	07/2028	0	6	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.096452+00	\N	\N
28	10	Spazio Exclusive Saraiva	Ea non iure dolores fuga consequatur voluptates vitae consequatur. Dolorem ipsam earum provident omnis sequi a nam. Ad est perspiciatis qui eum.\n\nAut velit commodi doloribus voluptatem mollitia molestiae voluptatum quis. Odio eligendi temporibus quo dolor omnis iste omnis maxime et. Eaque id quaerat magnam inventore.	Vertical	1237372	1866662	Entregue	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096471+00	\N	\N
29	2	Parque Premium Braga	Dolorem quasi ut aut voluptates aut sit aut rem nostrum. Voluptas dolores provident laudantium et omnis aliquid aut est qui. Recusandae voluptate corrupti illum velit aliquam magnam perspiciatis quam qui. Consequatur tenetur et officia excepturi impedit commodi laboriosam.\n\nNihil distinctio incidunt omnis omnis tempora cum dolor. Voluptas iusto illum quae. Animi harum enim iure molestiae. Reprehenderit ea velit aut optio qui qui. Et dolorem vel qui consequuntur.	Vertical	657793	1084807	10/2027	4	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.096561+00	\N	\N
30	5	Complexo Unique Oliveira	Deleniti sit nihil sunt omnis sit. Eligendi quia quis non quo soluta ipsa. Et neque velit ea rerum ut sit quisquam magnam doloremque. Repudiandae occaecati est. Architecto in mollitia consequatur voluptatem nesciunt est vitae. Sit exercitationem quibusdam deleniti quia.\n\nConsequatur ex harum voluptas omnis delectus et tempora. Veritatis qui architecto est illo soluta consequuntur nobis aliquid accusamus. Non aliquid totam vel esse minima veniam. Dolores unde quo qui totam.	Horizontal	1207127	2550470	Entregue	0	6	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.096591+00	\N	\N
31	1	Jardim Prime Martins	Architecto inventore repellat quo ut nemo sit assumenda ipsam. Aspernatur tempora consequatur saepe cum nam eos. Autem necessitatibus omnis inventore sed doloremque harum unde.\n\nInventore nesciunt itaque voluptatem labore quam ut magnam quis. Aut et nihil sint perspiciatis doloremque sed nemo enim officiis. Sit velit distinctio alias deserunt. At consequuntur doloribus et illo voluptas tenetur. Aliquam accusantium at et. Et a et cumque in consequatur officiis ut sed.	Horizontal	1740500	2175562	Pronto	0	8	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096622+00	\N	\N
32	8	Parque Garden Xavier	Vel qui libero aliquam earum numquam. Quidem quod tempora odio id id id. In recusandae ducimus nemo at et ut. Ad facilis voluptatem et non et labore sint inventore iure. Est dolor dolores non sed. Alias sed voluptatem.\n\nA impedit aut provident enim voluptatem ut quasi aliquid. Laboriosam ex nobis odio qui voluptatem impedit officiis officiis blanditiis. Tenetur perferendis quam dolorem commodi voluptate incidunt omnis.	Vertical	963009	2520759	Pronto	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096649+00	\N	\N
33	6	Ville Paradiso Martins	Qui maiores porro quasi. Id dignissimos nisi quo maiores. Numquam est repudiandae magni eos voluptates qui non quasi. Dolore et harum dolores.\n\nRepellat in expedita est voluptatum. Ducimus explicabo dolorum neque nihil animi voluptates repellat porro. Rem amet impedit. Exercitationem non quibusdam. Ut qui doloremque.	Horizontal	1524392	2188666	09/2026	0	19	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096672+00	\N	\N
34	7	Residencial Bela Vista Saraiva	Similique facilis dolor reiciendis tenetur adipisci. Aut incidunt beatae natus non dolores maiores consequatur et pariatur. Et temporibus laborum. Impedit nihil et necessitatibus quaerat eos sapiente nam. Quia harum officiis sapiente quibusdam et.\n\nRepellendus tempore reprehenderit et nobis qui. Dolorum quaerat omnis id quibusdam rerum et. Itaque aspernatur numquam aut dolor sit quaerat ut.	Horizontal	1340145	2217770	07/2026	0	15	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.096701+00	\N	\N
35	6	Ville Unique Albuquerque	Nisi et et molestiae. Omnis dolores tempore cupiditate eius. Voluptatem unde ab et rerum eum ut et id beatae. Dolore cumque dolores et beatae. Animi incidunt ab reiciendis animi. Qui dolorum voluptatum ipsa.\n\nDoloribus quisquam cumque quia sed numquam ut beatae. Tempora aut quo et. Impedit delectus ea saepe architecto corrupti dicta animi. Consequatur cumque provident nesciunt odio ut. Distinctio omnis eum fugit et perspiciatis. Incidunt iusto aut non ab sed nisi eligendi impedit nihil.	Loteamento	190301	367014	07/2029	0	9	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096745+00	\N	\N
36	1	Condomínio Imperial Reis	Ducimus labore dolorum nihil. Alias laudantium quas est qui laborum officia. Repellat sit quo aliquid itaque eum aut et voluptatibus. Provident reprehenderit totam eius accusantium voluptatem molestiae. Nobis magnam repellat fugiat.\n\nNon eos nihil quaerat reprehenderit aperiam autem omnis velit ratione. Quia est modi. Laborum similique sit quia harum. Dignissimos cum ea.	Loteamento	117435	296374	Pronto	0	7	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.096783+00	\N	\N
37	1	Residencial do Sol Melo	Explicabo quaerat et saepe. Impedit aut enim mollitia. Quia nesciunt illum error. Perferendis reiciendis aut iste corrupti eaque est aspernatur.\n\nCupiditate sed repellendus excepturi dolores a recusandae consequuntur. Et cumque dolores aut quas animi eos eaque. Incidunt aut dignissimos odit quo voluptas.	Loteamento	182338	276144	Entregue	0	5	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.096806+00	\N	\N
38	9	Plaza Exclusive Xavier	Sit deleniti qui nihil aut dolores qui odio. Officiis atque non vero quos. Suscipit id laborum aliquid asperiores ex magnam ad at ab.\n\nVel nobis blanditiis. Dolores voluptas expedita deserunt nisi possimus. Qui eum impedit reiciendis. Eum aperiam dolor numquam modi ea ipsum. Sapiente consequatur vitae doloribus quibusdam consequatur.	Horizontal	518013	923533	Entregue	0	17	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096824+00	\N	\N
39	4	Vila Horizon Costa	Accusamus sunt tempore temporibus optio. Harum expedita vitae error quia error commodi dolores. Est et voluptatem tempore porro quod architecto in. Eos amet molestiae et tempora atque assumenda a nesciunt. Ut maxime tempore. Repellat omnis sunt neque incidunt magnam sit possimus aspernatur voluptatum.\n\nRepudiandae consequuntur sint nihil dolor qui qui. Magni tenetur necessitatibus voluptate dicta. Repellat rerum sunt a cupiditate illum veniam.	Loteamento	209216	346844	07/2029	0	4	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.096846+00	\N	\N
40	1	Residencial Oasis Albuquerque	Est quo optio iusto nemo nihil hic est et. Deleniti unde nobis sapiente. Ut placeat similique nulla. Doloremque assumenda pariatur labore veniam quis magnam quia eligendi. Quam a natus et enim rerum. Dolorum perspiciatis impedit est ut et est.\n\nReiciendis nostrum aliquid velit itaque est. Quidem dolorum et natus nulla accusamus sunt dolorum. Voluptate ipsa et.	Loteamento	109231	226962	08/2027	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096874+00	\N	\N
41	9	Edifício Horizon Santos	Fugiat voluptates deserunt inventore libero molestiae. Voluptate sunt rerum rem est. Quia dolores eos unde dolorem nisi esse suscipit. Odit maxime consequatur.\n\nQuisquam quibusdam quo fugiat. Suscipit non quidem ut rerum. Autem atque voluptas praesentium qui ut.	Vertical	634330	763598	09/2028	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.096897+00	\N	\N
42	3	Torre Prime Moraes	Fuga id qui eum amet et est rem soluta. Rerum magni est. Nobis provident repellendus enim qui adipisci vel. Qui alias vel esse eum enim quasi esse. Suscipit tempora id optio sed non repellat. Sint eos qui omnis totam quaerat exercitationem dolores aut.\n\nOfficia eaque ut et deserunt in autem consequatur tempora. Et eos eos voluptatibus impedit inventore esse magnam maxime quod. Voluptatem autem id consequatur dolore expedita.	Loteamento	192456	248260	01/2028	0	18	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.096943+00	\N	\N
43	9	Plaza Horizon Moreira	Et reprehenderit et dolorum itaque voluptatem et. Dolorem sunt suscipit consequatur et. Et ipsam modi est dolores deleniti cum numquam est. Architecto eius a veniam dolorum officia.\n\nVoluptas porro aut vel sit voluptatem nesciunt corporis. Quo quia fuga aspernatur aliquam molestias dolorem. Culpa vel rerum hic dolores quia saepe. Ut veritatis enim et nostrum assumenda est magnam perspiciatis aut. Omnis est enim. Dolorem exercitationem ducimus aut aut aliquid.	Horizontal	1390181	1899136	05/2029	0	8	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.096971+00	\N	\N
44	1	Parque Real Barros	Eveniet maiores maxime. Animi dolorem deserunt debitis. Minima ut ea consequatur explicabo. Praesentium illum ullam. Voluptatem magnam vero est et.\n\nLaboriosam corporis aut laudantium ducimus et. Dolore voluptas a ut rerum reiciendis nihil. Facere nemo necessitatibus suscipit autem architecto rerum ad voluptas consequatur. Consequatur earum at nesciunt qui odio optio. Quos consequuntur deleniti qui ipsum.	Horizontal	673939	1184723	Pronto	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097002+00	\N	\N
45	2	Torre Prime Barros	Cumque nisi laborum vitae. Consequatur et hic ullam. Dolorem tempora iusto in rem. Harum maxime consequatur.\n\nTotam unde modi aperiam voluptas ea saepe quam dolor iste. Sit illum eligendi soluta cumque atque ducimus cumque voluptatum. Sunt esse officia dolorum eveniet nam dicta et.	Horizontal	1652018	2543851	12/2027	0	4	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.097025+00	\N	\N
46	4	Ville das Flores Braga	Vel optio molestias recusandae nihil. Omnis neque iure minus est sequi vel aut eos. Explicabo possimus numquam quae facere laborum. Voluptatem mollitia esse. Impedit natus autem quis.\n\nSed voluptatem error consequatur id dolor beatae ab. Est et adipisci molestias assumenda aut at et. Fugit distinctio dolor ipsa quae repellat et mollitia. Reprehenderit et beatae. Unde sed velit quaerat. Id quis mollitia ad cumque.	Vertical	1371567	1938542	01/2027	2	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.097042+00	\N	\N
47	6	Ville Lagos Macedo	Est numquam amet laudantium harum id vitae. Odio iste praesentium a aspernatur aliquam ullam autem. Ratione nisi consequatur consectetur quod. Illo praesentium quis ad neque repellat hic. Illum eius minima. Omnis voluptate alias.\n\nQuaerat dolorum iusto delectus repellendus. Maxime cupiditate necessitatibus quis eum laborum doloribus vel minima. Deserunt facilis consequatur est quidem. Ipsa fuga quia dolorem distinctio illum quae molestiae dolorem dolores.	Vertical	1273231	1549163	Entregue	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097068+00	\N	\N
48	5	Ville Oasis Santos	Illo vel qui consectetur praesentium nesciunt harum velit sequi aut. Et ipsa sapiente fugiat dignissimos. Officiis nihil quo vitae quis voluptas non quia aut aut. Quibusdam neque tempora vel maiores ea et. Sapiente fugit dolorem consectetur ducimus autem ut.\n\nEx deserunt est est quis placeat. Rerum earum amet. Commodi laboriosam eos omnis est incidunt. Cumque sint quis repellendus qui hic velit velit ea possimus. Vel ipsam nesciunt est culpa quisquam natus. Pariatur sed fuga rerum iste quod quis atque.	Vertical	345173	747651	09/2028	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.097116+00	\N	\N
49	8	Complexo Prime Albuquerque	Dolor recusandae accusamus nisi consequatur voluptatem. In quibusdam officia ut non quod doloribus. Voluptates ipsam laborum et quia doloremque aliquam sunt illum fuga.\n\nPraesentium voluptas aut ducimus recusandae exercitationem. Modi voluptas omnis sed et itaque expedita quod. Vero non eos placeat quis qui sunt. Corrupti excepturi aut et dolore natus excepturi magnam. Ad temporibus consectetur.	Horizontal	825306	2108733	Entregue	0	9	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097154+00	\N	\N
50	1	Ville Imperial Xavier	Ipsam ut consectetur velit cumque numquam debitis. Omnis dolorem dolor et. Ratione ex aut adipisci vitae consequuntur enim possimus totam ut. Impedit eos magni earum eum reiciendis enim rerum quisquam.\n\nLaudantium dolores perspiciatis dolores dolorem voluptas. Illum reiciendis consequuntur magnam praesentium dolorem error quod. Voluptatem enim cupiditate harum incidunt ut. Nihil ad aperiam sit enim laboriosam voluptas natus assumenda.	Loteamento	180118	348528	12/2027	0	16	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.097201+00	\N	\N
51	8	Condomínio do Sol Macedo	Id dolore aut et necessitatibus illum. Reprehenderit magni qui non totam. Aperiam accusantium rerum velit officia occaecati hic dolorem illum. Voluptatem sint doloremque perferendis omnis.\n\nSed eius et ut mollitia officia distinctio. Animi dolor incidunt est quis magni at. Molestiae tenetur et. Quam tempora occaecati. Tempora quod ducimus reprehenderit. Odit delectus aut vel non quas sit.	Vertical	616316	2524923	03/2029	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097231+00	\N	\N
52	6	Residencial Oasis Carvalho	Ab ratione repellat nam eligendi qui debitis sunt nulla tenetur. Nemo sunt temporibus voluptates eius quia velit. Et non atque vitae vero inventore quis. Eligendi sint id est dolor nemo ut et. Ipsum quidem modi voluptates.\n\nMolestiae labore aliquam unde accusantium veritatis. Exercitationem totam eum et neque corrupti perferendis provident. Quia voluptate corporis molestias cum. Debitis esse sequi.	Horizontal	798975	1121262	12/2027	0	13	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.097253+00	\N	\N
53	5	Jardim Lumina Reis	Qui non amet. Ullam beatae eaque eius porro porro. Nesciunt molestias earum dolor nam voluptatum voluptatem.\n\nPerferendis perferendis velit libero aperiam dolorem quia sequi nostrum cumque. Ut error et sed qui nihil optio deserunt rerum molestiae. Nemo harum labore harum cum laborum occaecati placeat cupiditate. Sit facilis culpa perferendis vel voluptatem sint voluptas sit. Fuga aut quae commodi.	Vertical	329763	556967	01/2029	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.097279+00	\N	\N
54	11	Parque Bela Vista Batista	Adipisci nulla quia neque voluptatem sed expedita sunt debitis. Enim est et est velit id libero placeat accusamus dolores. Dolor natus ut. Odit quia consectetur vel quae nihil necessitatibus quia reiciendis.\n\nQui soluta a laboriosam eligendi cupiditate eos corporis. Distinctio omnis inventore nemo magni. Recusandae qui veritatis consequatur dolores maxime et voluptates. Quidem non aliquam voluptatem molestiae.	Horizontal	1393599	2673799	Entregue	0	5	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.097303+00	\N	\N
55	5	Jardim Horizon Batista	Corporis iste voluptas consequatur tenetur autem dolores autem est. Eum fugit et perspiciatis sint corporis non quae dolores. Ipsa similique ut. Voluptas illo aperiam doloribus laborum. Qui aspernatur necessitatibus ullam sequi tempora est quos atque labore. Qui incidunt quia dolorem perspiciatis.\n\nSuscipit atque ut et molestiae qui. Quibusdam eos alias ducimus rem praesentium ut neque fugiat earum. Dolorum aperiam consectetur aut eligendi. Rerum excepturi velit vel illo totam veritatis.	Loteamento	222162	381477	06/2029	0	20	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.097359+00	\N	\N
56	7	Plaza Bela Vista Carvalho	Et non aspernatur dolorum tempora autem et ab accusamus sit. Ut in asperiores quam dicta ut doloremque. Officia itaque molestiae beatae fuga velit totam.\n\nEt earum in consequatur totam odio et. Explicabo facilis facilis dolorum fuga excepturi praesentium. Est veritatis dolorum distinctio facere dolores. Sequi officiis fugiat delectus quia rerum. Voluptatem accusamus qui magni provident aut. Error sunt perspiciatis est.	Horizontal	1794465	2751029	12/2027	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097388+00	\N	\N
57	4	Residencial Paradiso Saraiva	Est quia quia quos quia. Iste est dolorem quae recusandae possimus omnis et. Qui expedita deserunt ea sequi alias. Hic quis a aut alias repellat porro.\n\nConsequatur veniam sapiente. Delectus sit ad suscipit rerum eveniet non quis. Ut maxime inventore ad possimus qui eius culpa sint autem. Temporibus voluptas quidem in itaque neque ex dolores hic temporibus. Voluptatem culpa qui animi eligendi velit.	Vertical	729909	1074776	Entregue	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097411+00	\N	\N
58	5	Complexo Lagos Saraiva	Cumque dolor consectetur enim rerum aliquam explicabo aut quisquam. Nisi atque enim et sit dolores nostrum illo. Molestiae eligendi voluptatibus soluta ratione. Quia perferendis ex saepe numquam consectetur harum excepturi unde.\n\nSapiente dolores vero deserunt beatae labore et et. Qui voluptatum molestias odit nam fuga vitae repudiandae unde quibusdam. A explicabo veritatis minima in aut ipsam sit. Est rerum quos autem qui totam quia. Ut similique quibusdam et fugit beatae enim nisi ut. Sit nobis voluptatibus optio totam omnis deserunt.	Vertical	1366325	2096624	Entregue	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.097436+00	\N	\N
59	3	Plaza do Sol Souza	Perspiciatis cumque doloribus ducimus et exercitationem nam ut. Temporibus deserunt vero odio culpa. Dignissimos quia quia ut. Temporibus molestiae eos dolorem adipisci aut nam qui odit. Laborum dignissimos eius adipisci aut deserunt similique cumque aut iusto.\n\nRepellendus reiciendis animi distinctio et est. In officiis et et neque deserunt voluptatem in unde ex. Totam distinctio quis dignissimos. Tempore aut a est. Illum ipsam animi alias atque non laudantium dolores. Sit temporibus tempore officiis atque.	Horizontal	1788953	3062720	06/2028	0	14	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.097468+00	\N	\N
60	11	Ville Premium Saraiva	Debitis quasi magni harum atque voluptas ut. Aut est ut consequuntur temporibus praesentium voluptas molestiae. Minima in eligendi quo velit. Distinctio autem ducimus voluptatem consequatur quo repellendus provident maxime.\n\nDelectus iste rerum suscipit. Fugiat explicabo incidunt ut consequatur nisi et deleniti enim. Tempore unde accusantium amet at eius harum. Inventore modi est placeat sequi. Magni et deleniti magnam est. Nam incidunt quis.	Loteamento	263755	416593	08/2028	0	8	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.097524+00	\N	\N
61	7	Torre Borges Pereira	Culpa vitae non consequuntur hic dolorum. Voluptatem veritatis voluptatem ea architecto cum ipsum est quia sequi. Cum deserunt aut. Sed natus amet facilis dolores expedita facilis rerum fugit laborum. Aspernatur voluptates tempora ipsa aut.\n\nNon cum aliquid. Sit expedita quidem aut eius omnis et quia. Nesciunt culpa ea nulla placeat qui adipisci dolores ut eligendi.	Horizontal	1136850	2445581	05/2027	0	11	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.097553+00	\N	\N
62	4	Residencial Vision Macedo	Quis culpa ratione et quam quae aut. Accusantium laboriosam inventore asperiores beatae dolorem eius quas quisquam quos. Beatae repudiandae sunt ut. Veritatis nobis consequuntur omnis optio. Assumenda et nulla et quae et delectus aut aliquam.\n\nOptio veritatis cumque ipsa rerum consectetur ex mollitia harum. Aut nostrum libero consequatur harum sunt sed voluptatem. Ab molestiae et et et nostrum labore sunt velit. Beatae veritatis est perferendis. Et veritatis impedit omnis voluptas soluta aut et velit.	Loteamento	119005	255833	04/2027	0	6	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.097574+00	\N	\N
63	5	Vila Acqua Pereira	Repudiandae expedita ipsam molestias. Accusantium atque nostrum voluptas inventore hic molestias tempore. Dolorum dolor vel ratione consequuntur rem. Ut nihil blanditiis aspernatur itaque maxime laudantium consequuntur. Sit rerum autem voluptas.\n\nQui non dolorem provident velit molestiae at sunt incidunt fugit. Vitae eos et dignissimos et dicta nulla sunt iure et. Aut odio et quaerat dolor fugiat molestias ipsum aliquid alias. Voluptatem similique et consectetur voluptas blanditiis. Alias et et et distinctio.	Loteamento	151277	314920	01/2027	0	16	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.097605+00	\N	\N
64	3	Residencial das Flores Saraiva	Fugiat pariatur deleniti labore ea facere dolores. Maiores a eos eligendi officia quos eius nesciunt rerum. Ut autem nisi culpa sed consequuntur. Sed quo magnam mollitia aspernatur minus. Amet accusantium dolores quibusdam suscipit voluptate velit.\n\nReiciendis voluptas a consequatur hic ullam id vitae totam sit. Ipsum unde ut dolorem temporibus quis aut. Et neque quis corporis non minima nostrum ut. Praesentium quia nostrum. Aliquam error iure deserunt. Sunt et rerum molestias qui veniam corrupti ipsa.	Vertical	1455272	2459775	07/2028	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.09763+00	\N	\N
65	8	Complexo Imperial Franco	Iste impedit sint reiciendis. Ipsam dolorum eligendi maiores maiores odio dolor officiis. Corporis dolore omnis aut nobis veniam praesentium libero. Voluptatem doloribus earum nisi voluptatem.\n\nQui perferendis harum corporis esse est. Sit atque occaecati asperiores deleniti et sed et. Pariatur velit quos sunt ratione beatae. Quod praesentium necessitatibus occaecati aperiam quasi omnis.	Vertical	1230968	1502704	05/2029	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.097665+00	\N	\N
66	11	Jardim Paradiso Barros	Commodi omnis ipsam sapiente ipsa odio. Qui ut consequatur culpa eum quas suscipit. Officiis aut cumque est aut.\n\nAutem molestiae et dolores ipsam suscipit facere soluta maxime doloremque. Blanditiis est vel vitae est. Molestiae eveniet culpa consequatur. Deleniti iusto dolorem nostrum nostrum ipsam deserunt tempore totam.	Horizontal	692672	1074588	Entregue	0	9	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.097715+00	\N	\N
67	9	Condomínio Unique Santos	Ex ab quia aliquam earum earum delectus qui delectus. Aliquam corporis mollitia velit illo corrupti dolores voluptatum. Magni sed consequatur repudiandae dolorum quia dignissimos expedita voluptatem.\n\nUt dolorum accusamus libero. Sit quia amet dicta molestias est. Maiores totam similique ex aliquam. A ullam possimus quo dolorem ducimus. Eaque quia aliquid.	Vertical	1017233	2182122	07/2026	3	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.097739+00	\N	\N
68	7	Parque Oasis Moreira	Dolorem quas et in laudantium sapiente qui. Quia est perspiciatis excepturi consequatur incidunt velit ipsam. Minus quaerat eaque ratione perferendis sunt voluptatem.\n\nTempore est ad magni et quia nihil aliquam rem molestiae. Aut minus vitae. Odit ex recusandae quos iste. Nobis voluptatem ut neque aut.	Vertical	462442	1797486	Entregue	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.09776+00	\N	\N
69	1	Residencial Vision Silva	Quis libero doloremque et sit. Vero nihil dolor voluptatum nulla modi ab. Aut sunt ullam harum numquam odit est. Asperiores dolores modi occaecati fuga.\n\nAtque at deserunt sunt velit repellat ex consequatur commodi. Dolorem ea quisquam necessitatibus repellat velit quia id eligendi. Sit et sint sapiente.	Loteamento	168538	277060	03/2029	0	4	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.097779+00	\N	\N
70	1	Condomínio das Flores Pereira	Velit debitis repellat velit tempore aperiam est illo blanditiis. Est perspiciatis ipsum suscipit et praesentium voluptate quod quisquam quo. Et pariatur sapiente commodi. Qui quia molestiae totam nemo.\n\nId aut nihil. Aut harum ut dolores explicabo. Sint rerum corporis non. Eius necessitatibus ut tempore consequatur ipsam minima voluptatem inventore.	Loteamento	101558	197718	09/2027	0	7	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.097798+00	\N	\N
71	6	Torre Bela Vista Oliveira	Sint voluptatem eveniet minima aperiam velit ut nesciunt rerum. Et ut ea et rerum numquam distinctio nostrum veritatis dignissimos. Itaque consequatur amet enim iure libero quae quod ipsam. Illo maxime amet culpa id distinctio fugiat. Omnis sed necessitatibus. Doloribus omnis temporibus.\n\nRerum quae omnis velit iure rerum qui. Quidem praesentium quia perferendis optio veniam. Eveniet et repellendus asperiores quod molestias nulla. Autem cum reiciendis. Officia nemo reprehenderit. Odio fugiat eos repudiandae fuga aut et pariatur cupiditate dolorem.	Vertical	1310035	2034958	Pronto	3	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.110483+00	\N	\N
72	1	Complexo do Sol Pereira	Temporibus provident unde nulla explicabo architecto rerum eum. Beatae voluptas non consequuntur illum eos distinctio est nesciunt. Unde modi tempore quod voluptatem facere dolorum aut ratione. Sed ut cum inventore est cupiditate sed sit est. Ut autem totam quo. Aperiam quo recusandae optio et.\n\nMolestiae quis dicta. Nam cumque officia laudantium perferendis. Dolor dolorem et et dicta amet. Dignissimos quae unde qui fugiat quo et hic aut.	Loteamento	141683	309939	07/2026	0	6	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.110539+00	\N	\N
73	8	Vila Acqua Albuquerque	Pariatur neque et culpa laudantium et aut sequi. Laudantium commodi enim occaecati sed autem. Architecto blanditiis delectus odit. Quasi animi quis fugit sit qui consectetur perferendis. Ipsam ut maxime error.\n\nNulla quas sint dignissimos laborum qui natus nisi. Rerum incidunt atque voluptas aspernatur. Minima ducimus asperiores ut blanditiis est debitis illum laudantium ipsam. Quaerat rerum nulla.	Loteamento	259903	316901	05/2028	0	3	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.110564+00	\N	\N
74	7	Parque Prime Santos	Et nihil dignissimos. Quos nobis id excepturi eum ipsum et id est voluptatibus. Voluptatem inventore quo labore aut quibusdam est autem et. Voluptas deleniti aut culpa. Voluptatem tenetur nihil sapiente vero blanditiis harum. Quo culpa reiciendis dolore cum vel qui id.\n\nArchitecto non omnis quidem tempora. Quia est odio est asperiores voluptate animi commodi. Corporis tenetur dolorem ut ad. Quod tenetur sunt atque facere harum doloremque.	Horizontal	587896	1305539	Entregue	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.110584+00	\N	\N
75	9	Edifício Imperial Saraiva	Sit amet id saepe maiores omnis unde soluta. Eos suscipit quibusdam. Voluptas omnis aut.\n\nNon molestiae sit quo eum blanditiis voluptatem. Ea sint doloremque in fuga qui commodi. Commodi praesentium omnis illo doloremque quos tempora tenetur. Ipsa eum ad blanditiis nihil. Reprehenderit vitae iste placeat sequi eius placeat dolorem assumenda odio. Eos officia officiis aut quae maxime iste voluptas optio.	Horizontal	1461666	2961511	06/2027	0	4	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.110606+00	\N	\N
76	10	Parque Bravie Moraes	In sed omnis consequuntur quibusdam. Ab itaque autem omnis vel veniam autem aut voluptatum. Facere iure enim veritatis alias alias tenetur praesentium. Aut vitae aut. Veniam dolores veniam est ad amet eaque. Aut magnam rerum laudantium rerum animi.\n\nQuos incidunt sint in aut. Assumenda ut et velit. Neque et in et impedit.	Vertical	1471066	2819069	Entregue	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110626+00	\N	\N
77	2	Plaza Natura Albuquerque	Voluptatem inventore debitis deleniti. Repellat et qui enim quibusdam beatae. Qui doloribus earum et et velit excepturi. Et dicta eius rerum eos voluptatum quia in aut.\n\nPerspiciatis ut sit reprehenderit vel sit in consectetur eveniet nam. Repudiandae sunt qui recusandae neque earum exercitationem omnis inventore. Optio corporis iusto quae illo non.	Loteamento	287987	419694	Entregue	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110645+00	\N	\N
78	11	Spazio Garden Moraes	Ut error et nostrum. Eius optio minima consequatur nisi ut accusamus voluptatibus tempore temporibus. Ipsam et est. Ducimus sit qui consequatur est aut.\n\nNesciunt voluptatem harum blanditiis qui voluptatem. Ut id est. Saepe tenetur occaecati cupiditate. Autem libero id qui modi.	Horizontal	1237898	2627770	03/2029	0	15	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.110662+00	\N	\N
79	5	Maison Exclusive Franco	Et et sunt. Magnam iste et fugit aut. Nobis rerum necessitatibus.\n\nDoloremque voluptatem culpa consequuntur. Quod corporis quia id sit nemo. Omnis minima eveniet illum quisquam officia. Vel sunt quia qui modi veritatis officia illum. Debitis blanditiis tempore sint qui odio quaerat et quo.	Horizontal	1630838	3045928	Entregue	0	8	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110678+00	\N	\N
80	11	Condomínio Premium Albuquerque	Cupiditate iusto ut est doloribus dolorem nemo nulla laborum voluptas. Delectus quis eum in. Reprehenderit voluptas quis aliquam eos et nisi ad incidunt. Quia est animi voluptatem exercitationem exercitationem rerum nihil officia.\n\nAut adipisci voluptatem at. A excepturi quae quo distinctio. Sed molestiae asperiores non expedita sed magnam placeat quibusdam. Ut libero odio voluptas et. Sunt suscipit reiciendis at voluptatum ut hic quis.	Horizontal	1526550	1825099	09/2027	0	5	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110693+00	\N	\N
81	2	Parque Borges Souza	Voluptates debitis amet quaerat aut expedita. Excepturi nesciunt cupiditate accusantium. Voluptatem odio quasi autem molestiae odit est. Illum est qui est nihil minima. Qui commodi omnis expedita dolores aut numquam laboriosam ut eum.\n\nEst assumenda doloremque voluptatem laudantium. Est ratione nihil qui. Voluptas esse corporis qui natus sint. Consequatur quidem rem. Inventore omnis culpa at aut ratione facere.	Vertical	868117	1148089	Pronto	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.110714+00	\N	\N
82	8	Complexo Garden Souza	Ab eum placeat et necessitatibus voluptate. Distinctio omnis et animi omnis eos. Quia quia illo aut similique sit harum in. Ab aut enim est voluptas recusandae quasi.\n\nUnde ea excepturi fugit nihil laboriosam in consectetur qui. Non officia eaque velit minima quidem. Consequuntur quia mollitia sit ipsam in eos id debitis eveniet. Modi recusandae totam excepturi eligendi expedita odio reiciendis autem ea. Nemo qui hic quasi nostrum quis. Nisi omnis quis dolorum.	Horizontal	1139763	2499508	03/2028	0	15	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.110733+00	\N	\N
83	10	Residencial Horizon Moreira	Ad sed enim aut id officia sit illum. In ad aut tempora similique rerum non est rerum ab. Voluptatem fugiat optio tempora. Aut facilis quos asperiores est natus voluptatibus commodi mollitia.\n\nSed unde enim. Laborum neque in delectus ut exercitationem non delectus mollitia. Fugiat est non unde commodi quidem illum sit. Quasi tenetur aliquam doloribus itaque ipsa qui corporis. Quos est earum unde aspernatur et eligendi labore. Exercitationem at ab voluptas voluptatem facere quaerat fugit.	Loteamento	220199	394750	Entregue	0	12	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110757+00	\N	\N
84	10	Ville Vision Martins	Non minima et ratione optio excepturi sit tempore. Totam iure et soluta iusto amet. Impedit explicabo ipsa dolorum eius quis atque nemo laudantium optio. Est rerum optio pariatur iure. Cum non et ipsam asperiores et ut quas quae.\n\nRepellendus inventore omnis. Et nemo laborum. Ut a alias sed architecto eaque rerum. Odio consequatur et ullam. Dolores sed sapiente aliquam voluptates praesentium repudiandae soluta.	Horizontal	535971	1334452	07/2029	0	13	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.110781+00	\N	\N
85	5	Complexo Real Carvalho	Molestiae fugiat molestias id suscipit enim. Autem error iure sint. Officiis nemo voluptatem dicta consequatur. Dolores magni eum.\n\nDolorum suscipit molestiae excepturi nam rem non. Nulla illo eos qui voluptates reprehenderit et odit magnam. Quis voluptatem odio. Quisquam et voluptatem nisi enim doloremque cumque doloremque vel. Sequi maxime ipsam quisquam. Deleniti aperiam iusto consequatur.	Horizontal	743517	1138046	02/2029	0	19	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110802+00	\N	\N
86	2	Condomínio Lagos Barros	Illo aut asperiores. Incidunt doloribus consequatur tempora voluptas repellendus quae quae. Ipsa unde sequi facere asperiores quis saepe sapiente in. Vel consequatur explicabo nesciunt quia nisi placeat et et. Distinctio vel nisi nesciunt perferendis rerum nihil ut et. Aut sunt incidunt.\n\nPossimus corporis et dicta facere sed sint veritatis rerum et. Itaque nam officiis aut sed non. Quae autem nihil voluptas numquam est est laboriosam quia fuga. Quibusdam ea repellat. Hic et qui aperiam iusto ea laborum aut. Sit doloremque repellendus voluptatem cumque ipsam officia dolor natus inventore.	Vertical	1132123	1750249	Entregue	3	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.110821+00	\N	\N
101	9	Vila Vision Pereira	Officia aut ullam et illo eveniet voluptatem a debitis delectus. Ad non quam autem voluptatum sint voluptate quasi nostrum. Dolorum officia animi saepe officiis modi sit velit.\n\nCum delectus est sunt voluptas sunt numquam. Voluptatem non vel illo. Veniam enim architecto et consequatur deleniti sunt.	Loteamento	228580	407688	04/2028	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111135+00	\N	\N
87	11	Spazio Acqua Moreira	Minima tempora tempore ullam quia est velit nisi rerum temporibus. Non praesentium deserunt qui dolor ad autem et commodi. Earum et corrupti et sapiente dicta nulla. Illum quasi et iste delectus. Aperiam ipsum libero. Ea accusantium sed ut mollitia.\n\nPraesentium eveniet atque labore qui quisquam quis dolorum. Maiores asperiores ducimus facilis in nemo rerum harum. Harum iste atque enim. Sunt eum et fuga non. Commodi et ut facilis repellendus quia ut.	Loteamento	148577	271307	Pronto	0	2	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.110849+00	\N	\N
88	9	Residencial Central Xavier	Qui placeat voluptatem eaque ipsum ut facere ut sequi cupiditate. Tempora officia cupiditate nihil id blanditiis aut dolorum sint. A est exercitationem maxime possimus eum. Consequatur veritatis officiis explicabo eos expedita occaecati ut eligendi.\n\nOmnis laudantium deleniti voluptatibus voluptatem occaecati quisquam natus suscipit. Consequatur nam facere quo placeat expedita. Laborum ut sequi porro. Quia consequatur eum labore qui et earum esse sint. Quidem incidunt sed odio ut quo.	Horizontal	1987824	2196142	Pronto	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110871+00	\N	\N
89	3	Parque Imperial Silva	Voluptatem accusamus quis reprehenderit temporibus aspernatur. Aut doloribus tenetur deserunt tempora. Eos saepe delectus exercitationem libero quidem expedita explicabo eligendi. Voluptatem tenetur asperiores voluptate et aut et impedit. Dolores dolorum earum est sit. Dignissimos qui voluptatem est sint aspernatur ipsum.\n\nOfficiis dignissimos qui cum velit itaque id quaerat quia ipsam. Sunt ut hic mollitia provident corrupti. Voluptas soluta et. Deleniti laborum itaque eos nisi et ducimus ducimus rerum omnis. Nisi quam sit natus.	Loteamento	119611	184442	04/2027	0	9	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.110894+00	\N	\N
90	4	Vila Real Xavier	Voluptatibus quas ex nobis vel. Tempore eum rerum a vitae aut corrupti similique ipsam. Vero repudiandae odio tempore qui dolorem est. Et modi maxime. Nisi dolorum et praesentium corporis nisi ut rem.\n\nQui aut error fugiat amet illum. Quis aut quis. Rerum sunt sit expedita tenetur rerum et laudantium laborum. Ut esse temporibus quia et. Nesciunt et nesciunt delectus dolore eum et illum ut sit. Et ea aut quia.	Loteamento	202755	349803	01/2028	0	18	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110917+00	\N	\N
91	11	Parque Acqua Costa	Quos illum amet quae. Aut et dolores et. Repellat necessitatibus ipsam ut error. Magni dolore sit quisquam in. Ad harum dolorem. Eaque hic amet quo autem harum quia.\n\nMagni nostrum deserunt illo error vero. Deserunt magni eos perspiciatis et et omnis nesciunt. Reiciendis ut est et odit sapiente maxime voluptas incidunt. Est et commodi aperiam eum quia. Assumenda aut sit ut eos inventore.	Horizontal	1120945	1386692	Pronto	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11094+00	\N	\N
92	3	Maison do Sol Barros	Iusto aperiam odit dolorem maiores ea aliquid tenetur temporibus. Nostrum non est eius. Et est eligendi fuga. Totam assumenda ipsam harum ut. Et veniam labore aut atque sed.\n\nExcepturi voluptatem voluptas fugiat est ut aut et quia. Aliquid error laudantium earum. Molestias iusto reiciendis earum aperiam consectetur ut animi et facere. Rerum non aut nostrum natus sed et nostrum enim officiis. Ab et sunt.	Vertical	1084008	3076248	06/2029	2	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.110961+00	\N	\N
93	7	Plaza Unique Franco	Ut asperiores cumque tenetur. Provident dolores suscipit aperiam. Provident illo veritatis omnis consectetur. Autem laudantium amet.\n\nAut excepturi sint. Blanditiis alias unde praesentium. Vel velit cum voluptatum. Dolores quisquam laboriosam quaerat.	Loteamento	209898	389368	01/2028	0	7	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110982+00	\N	\N
94	11	Jardim Real Braga	Est omnis occaecati iste autem porro velit aliquam vel. Debitis necessitatibus est. Et molestiae asperiores est quidem distinctio dolorum eligendi. A architecto hic. Tenetur quaerat temporibus voluptatem iste cumque consequatur aliquam. Commodi ea qui nihil et incidunt minus aliquid.\n\nEaque est in at eaque sed. Neque natus perspiciatis. Dicta autem odit cumque voluptas enim deleniti. Sint non eius dolores enim at.	Horizontal	1397934	1779418	07/2027	0	9	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.110995+00	\N	\N
95	9	Ville Bela Vista Oliveira	Id ut nesciunt qui velit consequatur. Qui ut sed quo eos illum et quisquam cupiditate porro. Nam deserunt explicabo veritatis quo qui. Illum dolorum quia reprehenderit ipsa. Officiis consequuntur voluptatem. Accusantium asperiores tenetur eum recusandae culpa veniam quam consectetur laborum.\n\nMinus eligendi illum et numquam dolorem aut quod dolores. Hic velit hic tempora tempore officiis quia dolorum. Omnis ipsum libero illum perspiciatis repellendus qui ut. Dolorem dolorem mollitia nihil ut blanditiis iusto. Minus quam mollitia officiis ducimus placeat iure.	Loteamento	132600	280504	Pronto	0	2	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111015+00	\N	\N
96	8	Residencial Vision Reis	Doloribus aut aut eius error deleniti. Quia consequatur non molestias ipsam dicta aliquid expedita. Dolor molestiae corporis deleniti. Est dolorum dolores sit voluptatibus dolorem consectetur recusandae perferendis quo. Dolores vel alias quia velit praesentium molestiae commodi atque quam.\n\nPerferendis aut velit. Sed modi cupiditate aperiam repudiandae distinctio nemo reprehenderit repellendus quia. Quia iure et dolorem labore dicta.	Loteamento	125847	286176	03/2029	0	17	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11104+00	\N	\N
97	2	Parque Bela Vista Moraes	Nihil nam quis labore eligendi blanditiis consectetur tenetur debitis. Consectetur ut ut nihil sunt vitae beatae cum odit placeat. Nam et qui.\n\nSit repellat consequatur labore aut sed voluptatem doloribus vel nihil. Enim dicta et id voluptatem eveniet nesciunt molestiae quas maiores. Sit sit ullam sed sit consequuntur. Error ut est distinctio cum enim exercitationem iste et recusandae.	Horizontal	747957	1742886	04/2027	0	17	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11106+00	\N	\N
98	1	Residencial Oasis Martins	Sed explicabo sed nisi optio debitis et. Ducimus repudiandae dolores. Voluptas officiis occaecati qui architecto quidem libero error est temporibus.\n\nConsequatur quia et minima non nisi eos similique. Voluptas hic est modi sit. Quaerat enim quo eveniet libero sit adipisci. Dolor veniam unde beatae nihil numquam totam sunt.	Vertical	684762	1960160	08/2028	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111078+00	\N	\N
99	4	Vila Oasis Saraiva	Suscipit eaque minus maiores magni voluptatem aliquam. Omnis et officiis odio officia eum vel. Voluptatem et nobis nihil dolor molestiae dolor ad dolorum. Eum officia consequuntur alias commodi beatae et. Suscipit quos iste est.\n\nAut iure est ex maiores voluptatem quis aliquam. Quia inventore odio aliquam debitis iure voluptates et. Aliquid repudiandae velit in. Amet quo sint est.	Vertical	1174390	2606447	09/2026	4	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.111094+00	\N	\N
100	9	Jardim Garden Martins	Quibusdam deserunt voluptatem sit officiis omnis accusamus voluptas eum autem. Porro corrupti libero. Doloremque omnis a reiciendis deleniti odio mollitia iste corrupti. Officiis dolores ipsum velit et sint.\n\nSit libero alias dolorem ipsum veritatis quaerat vero. Dolor inventore ullam odio dolor fuga. Eum aspernatur vel consequuntur. Temporibus neque labore asperiores consequatur eveniet maxime laudantium. Dolorem aut ut quo in magnam corrupti vitae. Iste porro magni placeat.	Horizontal	771196	1166048	07/2027	0	10	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111113+00	\N	\N
102	4	Torre Lagos Costa	Voluptas vel molestias perferendis. Distinctio consequatur necessitatibus. Nihil placeat quas amet officia enim et. Rerum ipsa enim voluptatem perspiciatis quia laboriosam. Sint ipsum voluptatum.\n\nOccaecati error explicabo eligendi qui neque est eum. Expedita totam soluta suscipit. Possimus eius dolorum magni tempora nihil atque nihil. Assumenda expedita eius nostrum autem eveniet sed sed. Corrupti facere vitae.	Horizontal	1351581	2777976	04/2029	0	2	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.11115+00	\N	\N
103	2	Spazio Acqua Xavier	Excepturi expedita totam repudiandae. Adipisci qui magni. Quasi eum aliquid hic totam consequuntur unde magnam aut.\n\nRem natus aspernatur veritatis asperiores temporibus magnam ut. Qui similique ullam praesentium ea cupiditate doloribus quia eum est. Enim commodi assumenda.	Loteamento	244811	339704	05/2028	0	18	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111169+00	\N	\N
104	7	Plaza Real Moreira	Ut quos numquam iusto laboriosam ea sed maxime assumenda. Quia sit officia ducimus animi nobis non. Est aut magnam est qui quas nesciunt deleniti sapiente. Rem est pariatur voluptates rerum. Aut dolores nesciunt maiores ut libero vel sed.\n\nEos et id ex consequatur. Autem id neque vel inventore sed voluptas eveniet dolores. Incidunt et at amet omnis beatae totam culpa sint laboriosam. Aliquid ab nobis. Est ad voluptatibus possimus ut consequatur quibusdam sunt. Voluptas repudiandae autem placeat sunt accusantium quisquam dolorum.	Vertical	1124467	2179431	09/2028	4	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111182+00	\N	\N
105	1	Condomínio das Flores Martins	Dolorem similique vel omnis a esse sunt ab. Ut nesciunt et aliquid placeat incidunt nulla. Sit rem et beatae nesciunt dolorum rerum ipsum quos autem. Vel sunt et pariatur enim.\n\nConsectetur aut ipsa ullam et nostrum architecto dolor. Autem vel omnis quas. Quae corrupti pariatur qui. Dolore id voluptates corporis. Eveniet voluptatum id. Ullam molestias dolor id.	Horizontal	1144554	1634206	03/2027	0	9	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.111209+00	\N	\N
106	8	Edifício das Flores Pereira	Harum dicta ut quis numquam ullam qui. Laborum sint deserunt illum eveniet consequatur. At quod atque corporis perspiciatis at rerum voluptas sed quis.\n\nError voluptatem impedit voluptate eaque ratione libero consectetur. Odit enim nobis ea perspiciatis aut. Harum fuga optio accusantium et. Dolores itaque voluptates culpa temporibus minus a commodi amet. Non sint autem ea sunt officiis nobis quasi. Ratione rerum recusandae dolor delectus hic.	Loteamento	167393	228096	Pronto	0	7	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111227+00	\N	\N
107	11	Maison das Flores Xavier	Maxime voluptatem molestiae. Sed repellat quis praesentium ex laboriosam delectus aut. Reprehenderit et velit cumque voluptas vel in voluptas. Facere assumenda non voluptatem iste inventore voluptatum in.\n\nQui alias tempore omnis recusandae facere. Quaerat rem assumenda quia voluptatem. Earum voluptas ut officia. Voluptas exercitationem qui. Placeat perspiciatis rerum enim consequatur facere nihil eveniet. Vel odio perferendis quibusdam aut.	Loteamento	182195	253994	Entregue	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111248+00	\N	\N
108	4	Residencial Garden Macedo	Ad quia voluptas quidem voluptas quia et ducimus nihil. Sed quam quas quo. Molestias at enim laboriosam. Voluptatem tempora consequatur. Voluptatem voluptas alias cumque saepe. Unde deleniti sit at.\n\nDolorem quo ullam nesciunt. Eum praesentium qui sit consequatur non eaque voluptatum accusamus sit. Repellendus molestiae maiores. Autem aut sequi. Similique quia corporis officia quis.	Vertical	1049113	1334069	03/2028	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111268+00	\N	\N
109	7	Condomínio Prime Souza	Et officiis iste ut ab enim qui aut enim dolor. Corporis vel magni soluta quia ea temporibus occaecati. Delectus labore harum quia facere error dolorem. Id ullam laudantium delectus. Eos minima cum autem adipisci.\n\nUt perspiciatis officiis est enim aut et quia libero. Sunt aut libero et deserunt magnam est voluptatem est beatae. Ipsa maiores eveniet necessitatibus vel.	Vertical	1004371	2626083	03/2028	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111287+00	\N	\N
110	10	Condomínio Vision Silva	Placeat voluptas et et suscipit ut nulla molestiae. Nobis corrupti consequatur impedit natus aspernatur odit in. Ea perferendis accusantium. Alias ipsum natus modi quas laboriosam ea aut. In non ipsam unde laborum veritatis. Sapiente nemo sint nisi facere non reprehenderit velit.\n\nDelectus amet voluptas voluptatem ratione. Vel pariatur molestiae eveniet temporibus nobis sunt accusantium. Facere quia qui laboriosam ducimus et adipisci rerum et eum. Provident ut ratione est aut sed. Error eos perferendis saepe ex ipsum itaque dolores voluptas.	Vertical	1105553	1379015	03/2029	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111306+00	\N	\N
111	2	Vila Bela Vista Santos	Voluptatibus omnis sapiente ut est nam. Eius ut perspiciatis. Numquam fugiat quidem nihil architecto. Maxime nostrum et et consequatur. Ea ipsum accusantium debitis. Animi et veniam tenetur doloremque aut enim explicabo.\n\nCumque consectetur autem similique. Voluptates aspernatur vel. Suscipit consequuntur quidem. Nam inventore ut.	Horizontal	1595133	2180018	09/2027	0	12	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111333+00	\N	\N
112	3	Maison Vision Nogueira	Provident aut qui aliquid ut rerum voluptas voluptatem. Molestiae facere aut earum dolorem aspernatur ullam quisquam. Eligendi eaque accusamus dolore numquam praesentium. Nulla harum voluptate enim officia odio voluptas voluptates. Est vel ratione ut aliquam aut commodi quia.\n\nFacere corrupti eos error est et natus in. Commodi aut eum. Voluptas nulla sequi beatae repellendus earum qui eaque.	Loteamento	207699	351362	03/2029	0	8	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.11135+00	\N	\N
113	2	Jardim Prime Barros	Enim eaque voluptatem adipisci dolor. Quas vitae ut sed quaerat voluptatem earum quos. Est rerum labore ut culpa vero tempore ut omnis.\n\nEos eum aperiam qui id. Autem fugiat rem cumque ratione laboriosam doloribus. Nihil assumenda itaque deserunt maxime id ea rerum totam.	Horizontal	1543853	1796831	09/2028	0	14	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.111368+00	\N	\N
114	2	Parque Imperial Souza	Dolorem et dolorem qui ex. Rerum doloribus unde maiores vitae dolores. Id alias ratione saepe accusamus nemo. Voluptatem ipsa doloribus ratione vel aut. Nobis explicabo veniam. Quidem sit qui et impedit ut voluptatem dolor et.\n\nEnim rerum non quis a accusamus ullam. Est quis qui omnis ad. Totam id est consequatur. Et voluptatem quidem autem eum recusandae voluptas.	Horizontal	568807	1242985	11/2027	0	19	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111383+00	\N	\N
115	8	Parque Oasis Carvalho	Sequi magni ipsum eius dolor. Voluptas totam est eos autem. Sint accusamus rerum ut vero facilis culpa molestiae est. Praesentium aut nam reiciendis est.\n\nUt temporibus sapiente ut odit rerum. Voluptas eaque dolores a. Qui est quod iure cum eius. Incidunt neque inventore beatae rerum qui. Et excepturi sit libero veritatis veritatis excepturi quaerat.	Vertical	1045121	1655818	08/2027	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111402+00	\N	\N
116	6	Edifício Vision Macedo	Et amet et qui odio hic doloremque aut eos reprehenderit. Ipsum corporis amet dolores soluta laborum. Sit nihil fugiat commodi. Porro assumenda quia itaque voluptatum. Quisquam amet ut sit natus.\n\nNesciunt aut sequi. Non dolor eligendi esse facilis dolorum quidem iusto officia. Id dicta omnis sunt et aspernatur libero quia. Est incidunt voluptate debitis quam omnis accusamus nam.	Vertical	849525	2177083	Entregue	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.11142+00	\N	\N
118	2	Plaza Unique Martins	Eaque corrupti reprehenderit necessitatibus velit dolorum vero. Quia velit voluptatem nihil nostrum cupiditate ea repudiandae. Corrupti atque et. Optio magni vero facilis natus.\n\nVoluptates ipsa corrupti qui. Quae culpa nisi et atque facere eveniet impedit. Qui vel tenetur natus sit sint vitae est cupiditate.	Loteamento	161061	297966	Pronto	0	4	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111453+00	\N	\N
119	8	Edifício Premium Silva	Saepe animi deleniti ex non eaque minus quas. Sit ea consequuntur quia aut. Consectetur ea consectetur velit ut qui. Quo ab sit earum id. Est velit magni quis cumque fugit.\n\nNostrum beatae ipsum. Et in quasi. Cupiditate eveniet ex totam aut exercitationem ducimus.	Loteamento	153333	217322	12/2027	0	8	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111468+00	\N	\N
120	6	Edifício Exclusive Carvalho	Labore aut voluptatem tempore qui molestiae. Eum sed sed. Qui perspiciatis est voluptatem saepe.\n\nEos autem id sint. Sed maxime aut. Rerum ut quidem est aut perferendis fugit dolores in. Id tenetur natus commodi nihil et velit nulla quo. Ut ipsam soluta optio molestias consectetur eos natus aut.	Vertical	503953	1769479	05/2028	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111483+00	\N	\N
121	9	Edifício Real Oliveira	Sed qui distinctio rerum itaque quo voluptas harum autem sequi. Id eius et quidem aliquam impedit. Reiciendis unde praesentium et commodi odio aut maiores ullam voluptate. Fugit illo est non. Error et laudantium aut est. Consequatur perspiciatis nostrum debitis consequuntur voluptas molestias.\n\nBeatae molestiae pariatur temporibus ut rerum aut. Minima et ipsam qui ipsam. Quidem quo commodi.	Horizontal	1594554	2598730	09/2027	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.1115+00	\N	\N
122	6	Parque Unique Batista	Accusantium vitae repellendus consequuntur sunt minus praesentium. Quo saepe vero repellendus. Possimus non facilis eum rerum rerum delectus. Eos harum molestiae.\n\nAspernatur doloribus vero veritatis eaque quam dolor aut voluptate. Asperiores ipsum fugiat est et ut. Fugiat in neque ea.	Loteamento	206458	297972	10/2028	0	11	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111519+00	\N	\N
123	4	Spazio Oasis Melo	Mollitia illum non error iste quae voluptatum est maiores. Aut aliquid quasi dolorem quia. Odio deserunt quae tempora asperiores dignissimos ducimus.\n\nOmnis enim eos adipisci harum corrupti. Porro tempora sed fugiat cum et. Repellendus alias quia.	Horizontal	510466	1186319	10/2026	0	6	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111534+00	\N	\N
124	2	Maison Natura Carvalho	Ratione consequatur aut voluptas pariatur ipsa veritatis at. Beatae assumenda eum. Ex et reprehenderit optio error et est explicabo nisi. Autem magnam sint sed iusto architecto. Deleniti sint sapiente. Modi doloribus laborum laudantium.\n\nNemo similique ut debitis commodi et. Nobis veritatis eaque et vel eum error. Qui alias et molestiae. Veniam qui eligendi impedit. Doloremque quia debitis in aperiam.	Loteamento	251054	421490	Entregue	0	16	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.111547+00	\N	\N
125	7	Maison Garden Franco	Sapiente quasi repellat magni eum maiores error vero. Autem enim vitae aspernatur praesentium voluptatem. Explicabo fugiat nisi perspiciatis ea quae voluptates fuga in. Nobis eos quidem fugiat nemo. Ab accusamus velit. Animi non quas eum eaque et modi cum.\n\nOfficia quo tempora consequatur sed in eum architecto eligendi odit. Voluptas omnis in ipsum quibusdam eaque. Qui iure laboriosam. Odit voluptatem numquam non. Vero est et aperiam ut. Quidem aut ut id qui totam ad reprehenderit.	Horizontal	1235876	2573974	05/2029	0	3	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.111568+00	\N	\N
126	7	Plaza Prime Barros	Enim qui quia. Nostrum sunt sunt voluptate nemo et. Impedit aperiam numquam.\n\nUt voluptatem asperiores dolores unde corporis. Enim vitae rerum saepe facere vel ad. Ut aut id omnis quibusdam veritatis sapiente magnam sequi sit. Maxime optio natus ea dolor praesentium debitis eos eum. Et eligendi quam. Fugiat voluptate quo deserunt optio minima magni praesentium amet ut.	Vertical	1421971	2398343	12/2028	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111592+00	\N	\N
127	3	Complexo Exclusive Santos	Vel aut omnis non soluta minima dolorem quis aspernatur eum. Aut totam ducimus est. Saepe quia occaecati. Est ut velit possimus.\n\nEt consequatur sunt voluptatibus nihil quidem iste eum quo. Fugiat velit est velit doloremque ut. Vel aut est ad rerum itaque expedita dolores doloribus. Eos ea omnis sit rerum eligendi adipisci est modi dolor. Autem repellendus sint dolore quia quia ex.	Loteamento	254907	398561	Entregue	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111611+00	\N	\N
128	9	Residencial Paradiso Silva	Maxime qui aut atque aut velit voluptatem voluptatem. Dolores veritatis corrupti consectetur officia architecto at. Totam est non architecto. Magni voluptates iste. Odit necessitatibus numquam rerum fugiat porro.\n\nTempore error velit quam distinctio reiciendis qui autem. Dolorum natus nemo magnam est et autem. Saepe cumque eveniet optio quia blanditiis laborum quia vel.	Horizontal	637282	2061484	Entregue	0	8	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111631+00	\N	\N
129	1	Maison Garden Nogueira	Et aut sed. Excepturi cumque sed enim sapiente sequi illo velit necessitatibus quidem. Veritatis voluptatem at nemo quas. Ut magnam cum nam modi et. Libero est molestiae sequi debitis sed culpa fuga qui ab. Perspiciatis magnam et iste quod laborum.\n\nDicta neque alias neque itaque illum. Suscipit facilis accusantium deleniti reiciendis. Laborum aut et eum eos ipsum minima quae nemo provident.	Horizontal	1270595	2453800	Pronto	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111649+00	\N	\N
130	2	Parque Unique Albuquerque	Distinctio ut molestias inventore culpa accusantium quia et eum veniam. Animi tempora sit. Eum voluptas vel nesciunt rerum vel. Consequatur assumenda quia amet.\n\nQuia itaque hic aut. Corporis expedita ratione quisquam ea libero nihil ullam esse. Ratione molestiae eos dolorum nulla ratione et aut. Sit dolores assumenda officiis. Earum velit quod laudantium.	Horizontal	679220	1715555	11/2026	0	6	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111671+00	\N	\N
131	1	Jardim do Sol Macedo	Commodi omnis recusandae. Consectetur earum eos repellendus omnis sit. Quia at quam exercitationem sed ipsam voluptatem. Aut quidem nemo rerum qui et. Nesciunt harum aut dolores sapiente.\n\nDucimus aut similique nemo commodi. Quisquam molestias id enim est necessitatibus. Autem labore possimus ullam assumenda quis aut. Adipisci tempora ipsum nemo nisi aut nulla officiis maxime aliquid.	Horizontal	674879	1938017	04/2028	0	7	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111689+00	\N	\N
132	7	Maison Premium Melo	Id nisi quia omnis omnis earum. Consequatur qui esse ipsum sit esse alias vel. Dolores sit et.\n\nUt eos asperiores et labore voluptatum distinctio. Asperiores nam consequatur vel sed. Maiores libero vel provident aliquid et ut expedita sed dolor. Omnis facilis eius similique ut nihil saepe rerum.	Loteamento	266347	419625	04/2028	0	15	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.111708+00	\N	\N
133	3	Vila Prime Batista	Quod et quia et. Fuga nostrum maxime ipsum. Eaque harum eius illo ut quis.\n\nDelectus rerum neque asperiores illum eligendi id. Quis saepe consequatur id tenetur officiis sed sint ipsam. Facere distinctio autem non est omnis sequi.	Horizontal	1034749	2427669	Entregue	0	17	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.111724+00	\N	\N
134	1	Plaza Bela Vista Saraiva	Exercitationem quia fugit officia perferendis ut. Impedit nemo architecto blanditiis sed. Aut nemo molestiae exercitationem qui ut voluptatem non rerum.\n\nNeque ducimus dolor aliquam explicabo. Alias cumque modi dolores ea ut. Voluptas repudiandae ab sit facere aliquam sed et dolore est.	Loteamento	217310	318000	04/2029	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111736+00	\N	\N
135	6	Vila Oasis Moreira	Esse rerum necessitatibus ut qui. Et perferendis praesentium voluptatibus adipisci commodi dolorem facere in quia. Consequatur quo provident iste dolorem.\n\nQuia amet est dolor quos consequatur molestiae. Molestiae temporibus ipsa qui corrupti reprehenderit. Consequatur assumenda harum. Placeat occaecati occaecati.	Vertical	337111	1801285	03/2028	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111751+00	\N	\N
136	3	Maison Real Costa	Labore labore enim eum autem quibusdam suscipit. Mollitia sit magni nisi sequi et eaque quia dolorem. Odit vero temporibus aut quia.\n\nHarum odio sed. Culpa cupiditate quae magni voluptates quos ratione non ipsum. Molestiae facilis asperiores dolor necessitatibus earum deleniti cum labore. Eum numquam distinctio atque animi officiis sed quaerat atque quidem. Molestiae neque ducimus adipisci consequatur accusantium quia. Veniam velit perspiciatis aut aliquid.	Horizontal	1811789	3256712	Entregue	0	2	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111764+00	\N	\N
137	6	Ville Real Pereira	Aut corporis totam. Iure soluta facere. Est soluta sed perspiciatis doloribus at facere harum.\n\nAutem voluptatem at qui quibusdam nihil vel adipisci itaque incidunt. Sit animi asperiores et autem voluptatem dolor est. Ducimus ex et et. Placeat et omnis quisquam sint soluta aut.	Horizontal	521121	2011691	Pronto	0	11	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.111785+00	\N	\N
138	7	Vila Prime Xavier	In quasi consequatur nesciunt voluptas. Culpa mollitia assumenda. Repudiandae deserunt molestiae.\n\nIllum laboriosam porro. Non in est ut nesciunt tenetur saepe id nemo blanditiis. Eveniet dolorem quia. Exercitationem illo natus nisi architecto ducimus totam ipsa. Perspiciatis repellendus similique odio et nobis consequatur architecto architecto animi.	Vertical	1380817	1657768	Pronto	3	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.1118+00	\N	\N
139	8	Maison Paradiso Nogueira	Incidunt rerum odit odit rem et harum et enim et. Consequuntur perspiciatis labore perspiciatis qui minus minima quia dolores. Est mollitia id aspernatur distinctio minima. Quos ut animi qui ea et non rerum adipisci. Dicta quas ea laboriosam est ut totam eaque nulla et. Nesciunt eius et id ab autem veritatis in necessitatibus explicabo.\n\nCulpa laudantium adipisci commodi vitae temporibus. Doloribus provident et voluptas consectetur perferendis quo voluptatem. Distinctio voluptatem adipisci ipsa. Facere ad qui eius.	Vertical	603627	716677	Entregue	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111816+00	\N	\N
140	4	Parque Prime Pereira	Doloremque ratione velit recusandae qui voluptas esse. Ut illo ab non in sit nemo. Totam nemo expedita iusto a est iste officiis pariatur. Itaque saepe officiis nam ut. Maxime atque provident.\n\nNulla odit nam doloremque reiciendis ducimus asperiores architecto numquam. Beatae optio enim id et aperiam eligendi veniam libero est. Qui ut eum rerum sit quidem rerum sed. Nostrum corporis doloribus dolore quis at. Et dolorum eum. Voluptate eveniet quae voluptatum.	Loteamento	293103	382848	08/2026	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111841+00	\N	\N
141	5	Edifício Bravie Costa	Ut inventore ad soluta dignissimos eum est velit quia. Dolorem nostrum suscipit quibusdam aut eaque quia sapiente laudantium sit. Et temporibus odio tenetur enim possimus fugiat corrupti distinctio. Molestias a sint fuga eligendi dicta autem aspernatur et eum.\n\nExercitationem pariatur optio explicabo quos dolore eaque aliquid. Nemo repellat illo modi ex totam dolores hic eius harum. Soluta ea nam eveniet sit maxime aut dolorum tempore ad. Ea et quia numquam dignissimos culpa corporis neque omnis mollitia. Ratione sed dolorem.	Horizontal	1337419	1691062	02/2029	0	20	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111865+00	\N	\N
142	6	Plaza Exclusive Reis	Quia provident autem voluptatem fugit quia possimus facere voluptas. Soluta quaerat minima. Architecto quis laboriosam. Aut dolore non officia eum et omnis. Esse aspernatur eos perferendis ratione.\n\nVelit suscipit modi labore eum quaerat in dignissimos. Ea et eligendi iusto autem sed fugiat temporibus minima odit. Amet est quaerat perferendis adipisci nihil. Perspiciatis et necessitatibus vel maxime qui reiciendis consectetur. Sit doloremque sed odio minima cupiditate voluptatum ut.	Loteamento	259786	374410	12/2028	0	6	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.11189+00	\N	\N
143	9	Residencial Prime Carvalho	Reprehenderit rem eum molestiae illum blanditiis dolore veniam est occaecati. Et sed nostrum consequatur quas id distinctio sed consequatur perspiciatis. Repellendus a similique quas ex. Magni soluta sit repellat. Aut nihil magnam porro nihil ipsum tenetur minus beatae vero.\n\nDolores assumenda blanditiis eum qui provident culpa deleniti ea. Accusamus maxime voluptatem odit quam corporis pariatur laboriosam. Earum adipisci illum consectetur maiores consequatur. Et reiciendis reprehenderit similique est.	Vertical	885243	1926513	Entregue	3	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.111913+00	\N	\N
144	6	Maison das Flores Moreira	Labore blanditiis cumque asperiores consequuntur. Consequatur nemo nihil omnis dolorum reiciendis nulla eum neque exercitationem. Expedita enim et.\n\nConsequatur corporis qui ut inventore ipsa in omnis. Rerum nihil dolor possimus optio expedita. Ad enim fugit consequatur impedit aut autem facilis. Et minus eum omnis saepe ad asperiores est. Adipisci at architecto enim voluptatum dolores cum.	Loteamento	220693	382707	Entregue	0	16	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.111935+00	\N	\N
145	6	Complexo do Sol Costa	Voluptatem voluptas aliquid aliquid et nemo eos. Repellat labore earum praesentium. Inventore laboriosam amet quaerat voluptas placeat praesentium.\n\nAliquid nisi est cumque voluptates occaecati et doloremque. Quasi recusandae nemo. Quia qui eos rerum iusto et. Dolor enim voluptate pariatur incidunt. Voluptas reiciendis ipsa vel ullam assumenda aut eum fugit temporibus.	Vertical	1127314	1243579	01/2029	1	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.111954+00	\N	\N
146	1	Spazio do Sol Santos	Qui cumque placeat in nihil. Deleniti deleniti optio dolores eaque ut maxime aspernatur quisquam magni. Vel totam commodi quasi soluta delectus aut blanditiis aut harum. Nisi aut et omnis architecto. Velit qui est qui dolores quia nemo hic quos. Labore aut repellendus perspiciatis recusandae rerum illum ipsam beatae.\n\nHic numquam ex. Nihil id non voluptatem sed error aliquam. Quis accusamus laborum eaque cum est adipisci explicabo sit. Consectetur quos accusantium distinctio sequi dolorum nisi nisi repellendus quae. Corrupti sequi porro ea aspernatur eos molestiae est. Itaque eius occaecati repudiandae deserunt enim rerum iure voluptate.	Loteamento	111896	196066	08/2028	0	5	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.111971+00	\N	\N
147	7	Plaza Natura Moreira	Voluptatem mollitia non dolores perferendis alias qui. Similique ut quisquam vero aliquam assumenda optio quisquam corrupti. Hic facere optio dolore magnam maxime. Excepturi esse magnam consequatur assumenda incidunt odio.\n\nAssumenda impedit vel vero at aut ipsum ab. Ad blanditiis et illo mollitia quas. Voluptatem tempora itaque voluptatem reprehenderit optio et dolor eius quas. Esse aut dolor.	Loteamento	220307	271153	Pronto	0	5	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112002+00	\N	\N
148	8	Jardim Acqua Melo	Sapiente et enim omnis ut. Dolor quo ullam aut est excepturi nam voluptatem. Repellendus et est. Sed quis sequi fuga tenetur. At quia suscipit reprehenderit.\n\nNobis distinctio consequatur aut ut quis consequatur iure. Dicta repellendus odit totam aut praesentium maxime exercitationem iure. Sequi et eaque molestias aspernatur ut minus mollitia sapiente natus. Animi qui similique perferendis. Esse velit eaque eum illo quod laborum quos nobis. Adipisci nemo adipisci ducimus velit officiis illo error officiis.	Vertical	1490899	1880958	Pronto	2	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112021+00	\N	\N
149	2	Spazio Real Carvalho	Aut nostrum dicta id perferendis a facilis omnis. Aut in non. Quos aut cupiditate officia. Totam quo aspernatur voluptatem. Numquam aut est dolorem libero autem non est.\n\nOptio magni architecto accusantium nihil qui incidunt inventore ut. Sapiente sint ullam eligendi numquam. Et dolores molestiae minima voluptatem in ullam quo rerum soluta.	Vertical	700603	880780	02/2029	2	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.112047+00	\N	\N
150	5	Torre das Flores Batista	Et omnis asperiores qui. Molestias consequuntur distinctio. Fugit nobis cumque deleniti. Et amet iusto consequatur optio in. Delectus quasi ex porro saepe molestiae rerum in dolor asperiores.\n\nSimilique rerum error nostrum ea est nobis molestiae unde. Delectus nostrum aliquam labore rerum voluptas debitis possimus sapiente ea. Deleniti autem sit eum nostrum molestiae ut quo possimus in. Dignissimos tempora illo architecto amet dolores nisi et velit. Neque distinctio incidunt ut iure et iusto est. Ad ex temporibus.	Horizontal	1205904	2085237	04/2029	0	13	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112065+00	\N	\N
151	9	Condomínio Borges Silva	Enim aut sapiente qui et accusantium omnis quo expedita delectus. Excepturi occaecati veniam quidem vero. Iste sequi sint aut quas non cumque. Id culpa molestias magnam.\n\nAut quo ab voluptatem doloribus eveniet officiis. Enim odio consequatur atque. Modi nihil autem placeat ut aliquid voluptatum. Natus illum cupiditate laboriosam est quibusdam tempore. Culpa neque quis ratione voluptas.	Horizontal	978638	2442535	07/2028	0	6	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.11209+00	\N	\N
152	11	Vila Unique Moraes	Quis praesentium repudiandae officia fugit non autem hic repellendus. Molestiae neque id maiores ea. Officia repudiandae consequatur quam dolorem aliquid aliquid. Provident soluta omnis in veniam.\n\nSuscipit corporis cupiditate ea aliquid dolores laboriosam laboriosam ex tempora. Voluptas commodi eos. Ullam atque perferendis nemo minus non accusantium libero velit quia. Ullam numquam aut. Laudantium eos labore consequatur in voluptatem quia consectetur aut exercitationem.	Loteamento	120537	249130	Pronto	0	5	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112109+00	\N	\N
153	9	Parque Garden Franco	Tempora fugit minus qui ut. Iure est ut velit ipsa ducimus. Sed eum facilis voluptatem amet et consequatur sequi beatae.\n\nVoluptatum praesentium eligendi veniam nisi repudiandae facere fugiat. Praesentium possimus adipisci ipsum eum sapiente nihil. Dolorem saepe sit pariatur. Voluptatem ex sit ipsum sunt recusandae ut est dolore voluptatem. Aut maxime qui et non qui quisquam iusto et. Placeat harum minima veniam aliquid.	Horizontal	1413929	1647415	Entregue	0	19	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.112129+00	\N	\N
154	2	Parque Borges Braga	Ex impedit inventore. Ut nihil quia eos qui laboriosam enim repudiandae. Velit sequi ipsam minus nesciunt officiis dolores recusandae. Tempora asperiores eius consequuntur quasi aperiam. Et et ut repellendus maxime dolorum exercitationem.\n\nOmnis cum voluptatem. Dolores exercitationem dolores placeat maiores velit. Qui recusandae qui quam quia quis suscipit consequatur aut beatae. Nam libero quibusdam mollitia. Nam consequatur quidem qui cupiditate placeat pariatur eos et. Quo eos saepe eos ut aut sed cumque deserunt illo.	Horizontal	1712084	2348826	06/2028	0	17	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112151+00	\N	\N
155	2	Plaza Oasis Silva	Tempore reiciendis sequi recusandae est. Labore debitis ut quaerat. Eum consequatur excepturi in enim eius sapiente perspiciatis provident fugiat. Porro voluptatem sit iure iure itaque quos. Beatae at exercitationem et aut qui id numquam fugiat in.\n\nOptio tempore unde alias corporis eos esse aut consectetur debitis. Rerum neque ut et laborum. Suscipit fugiat officia voluptatem est nemo est quia sint rerum.	Vertical	995364	1588143	Pronto	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112175+00	\N	\N
156	1	Ville Unique Moraes	Molestias corrupti omnis quam saepe dicta numquam. Beatae corrupti sit illo minima est veniam animi reiciendis tempore. Eum fugit rerum sequi nesciunt et rem et vero molestiae. Dolorem blanditiis et perferendis ut sit at. Impedit nostrum molestiae qui necessitatibus quo quo id deleniti. Fuga placeat placeat aspernatur vero perferendis quia fugit quam.\n\nNeque minus maiores non optio odit dolorem ea provident. Odio repellendus sit. Eum magni illum veritatis sequi in qui dolores laboriosam magni. Occaecati odit quo. Tenetur quibusdam quis voluptas et laboriosam amet mollitia et.	Loteamento	162275	333920	Entregue	0	9	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112196+00	\N	\N
157	4	Plaza Lagos Macedo	Quia delectus molestiae. Tempora facilis et ut et earum id quia sit. Incidunt officia quasi illo eos vitae dolor qui placeat. Quia vel quia ipsa omnis. Veniam eum quaerat earum architecto sit molestias provident aut repellendus. Illum reiciendis repudiandae quibusdam optio corporis aliquid sunt voluptatem minima.\n\nDucimus pariatur minus quos eum reiciendis dolorem nemo. Quod voluptatem architecto et. Quo eos architecto unde nemo asperiores corporis. Sit commodi illum voluptatem ad maxime incidunt sed maiores. Temporibus eaque eos hic consectetur dolores.	Horizontal	1392699	1884777	Pronto	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112223+00	\N	\N
158	9	Ville Natura Albuquerque	Quibusdam est aspernatur ea sit. Consequuntur quae et eos nemo rerum sunt error. Dignissimos voluptas unde.\n\nAutem quasi et omnis qui quas corrupti fuga. Facere quia iusto eveniet quam sed inventore itaque excepturi. In laudantium voluptatem quidem aut incidunt assumenda at nulla laboriosam.	Vertical	914768	1335628	02/2028	2	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.112249+00	\N	\N
159	7	Edifício Premium Moraes	Ratione suscipit sequi numquam quia aut voluptas omnis et. Dolore omnis praesentium numquam minus mollitia. Aliquam deleniti expedita consequuntur nobis nisi vero rerum eveniet. Doloribus provident error explicabo sit.\n\nUt quisquam saepe et. Vitae expedita nostrum molestiae possimus atque. Quas perferendis iusto minima voluptatem laborum amet et. Quidem quibusdam ab molestiae accusamus. Qui animi voluptatem rem. Earum aut deserunt cupiditate.	Vertical	483011	2368014	01/2029	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112264+00	\N	\N
160	1	Torre Bela Vista Santos	Nihil voluptas odio et itaque accusantium. Sed asperiores aut sed rerum. Id omnis amet est ipsam aut earum qui deserunt beatae. Molestias quod maiores sapiente. Sit cumque perspiciatis magni est numquam.\n\nSit reiciendis saepe qui enim optio excepturi. Vero dolore minus dicta ut reprehenderit aspernatur aut animi. Et facilis aperiam sapiente.	Vertical	600208	1962350	03/2028	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112285+00	\N	\N
161	8	Plaza Paradiso Martins	Incidunt et quam exercitationem consequatur cumque eos. Amet sint provident et molestias veritatis consequuntur. Voluptatem et ipsa quasi consequuntur.\n\nSoluta dolorem ut est voluptatum velit. Rerum nemo voluptatem qui. Vel ab omnis perspiciatis eaque et. Officia aut expedita fugit ipsa vel exercitationem sit. Adipisci eum id quo ut sunt magni maxime sit quis.	Vertical	1003977	2293693	06/2028	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112326+00	\N	\N
162	3	Residencial Di Roma Costa	Quis molestias molestiae repellat eaque optio. Assumenda provident officia. Deleniti optio aut voluptatem provident porro amet enim. Voluptas vero aperiam dolore qui ipsam corrupti. Laboriosam dignissimos velit esse culpa in quibusdam quia. In nesciunt soluta.\n\nUllam dignissimos quia error consectetur voluptas provident est soluta nisi. Sunt consequuntur ab fugiat ipsa harum. Veniam sed laboriosam non officia maiores assumenda aliquam.	Vertical	584729	1921790	07/2028	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112347+00	\N	\N
163	10	Spazio Borges Nogueira	Ullam animi dolores molestias quis harum aliquid. Ab dolores dolores sunt incidunt. Aliquam quas sed suscipit esse sequi. Tenetur ratione repudiandae ut error minus dolor. Praesentium consequatur et sed assumenda inventore.\n\nPerferendis provident neque eos consequatur. Explicabo ducimus quia nulla temporibus perferendis quibusdam aut nemo. Temporibus ipsum illo. Reiciendis vero sequi ea.	Vertical	1354565	2808836	05/2027	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112368+00	\N	\N
164	10	Torre Prime Albuquerque	Consequatur molestias reiciendis officiis molestiae sunt voluptatum quos. Est deserunt dolorum magnam eius suscipit dicta. Similique sequi voluptatum non laborum nulla perferendis consequatur. Quae ad mollitia rem. Porro et quidem sed libero corporis distinctio voluptates adipisci nulla. Molestiae quo labore dignissimos ut maiores illo.\n\nVeritatis nihil cum aut. Eius odio eaque. Qui quisquam qui ab repellat quia neque. Velit nam enim aut.	Horizontal	1838509	2865766	07/2029	0	19	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112387+00	\N	\N
165	2	Vila Bravie Moraes	Voluptatem repellendus aut ducimus delectus voluptate. Voluptatem quam aliquam odio culpa ullam quia et. Omnis ut voluptatem. Quisquam aperiam non. Autem tempore dignissimos accusantium dolorem molestias laboriosam repudiandae.\n\nEa ad eum ab accusantium possimus cum. Aperiam molestiae molestiae quidem doloribus quia fugiat. Dicta officiis voluptatem ad occaecati perferendis neque. Est qui dolor ullam. Similique fugiat ratione exercitationem libero iste.	Horizontal	1720868	2388495	Entregue	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112409+00	\N	\N
166	6	Vila Unique Martins	Illo quasi architecto ab nobis unde enim quia optio deserunt. Dolore possimus mollitia reiciendis nesciunt in nisi ea. Sed qui natus odio vero excepturi molestiae voluptate iste sunt.\n\nIste quo deserunt et vitae sint id hic consequatur. Eveniet voluptas voluptate et quas deleniti et alias possimus dolore. Et ut dolore repudiandae. Eligendi eos voluptatem perferendis et dolorum consequatur. Sit quia illo ab et quibusdam soluta aut. Distinctio omnis aut nam reprehenderit qui repellendus iste consectetur.	Vertical	1277407	2262045	Pronto	1	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.112429+00	\N	\N
167	6	Complexo Natura Carvalho	Et et est placeat magnam at eligendi qui. Aut aut eius et et voluptatem. Voluptates corporis reiciendis nihil vel assumenda ipsam aut deleniti. Velit et cum placeat qui enim dolorum. Aut nesciunt blanditiis voluptas id officiis tempore minus. Necessitatibus repellendus porro accusamus sapiente.\n\nUt nostrum voluptatem consequuntur rerum libero in vel est repudiandae. Quo quis quaerat. Doloremque occaecati enim ipsa quisquam. Blanditiis eveniet consequatur. Voluptatum est iure dignissimos. Ducimus qui incidunt.	Vertical	1044186	3018998	Pronto	3	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.112453+00	\N	\N
168	10	Edifício Exclusive Melo	Accusantium error quo. Sed exercitationem id reiciendis voluptates ut amet ut quaerat est. Facere aut voluptatem nihil maxime qui. Ratione nihil eos sapiente id.\n\nUllam repellat earum voluptatem cumque delectus non sapiente est aut. Non perspiciatis aut. Aperiam optio est saepe. Illum et aspernatur omnis. Non laboriosam nesciunt id quis molestias est pariatur est. Perspiciatis autem ut dolorem.	Horizontal	1739890	2818178	11/2027	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112477+00	\N	\N
169	2	Complexo Horizon Barros	Molestias et rem voluptatem voluptatem placeat assumenda qui commodi. Adipisci sequi quis eveniet ducimus. Velit repellat ut. Provident ea nemo voluptatem nobis. Alias vel sit tempora sunt aut natus. Aliquid sed enim dignissimos perspiciatis amet quasi occaecati debitis.\n\nQuae sit quisquam voluptates nisi. Eos et esse doloremque dignissimos est mollitia. Harum aut recusandae optio molestiae officiis saepe enim rerum. Rerum explicabo ut doloremque soluta atque inventore nostrum dolorum.	Loteamento	245597	382720	04/2027	0	16	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112556+00	\N	\N
170	1	Vila Lagos Moraes	Numquam ex autem magnam laudantium natus. Commodi commodi quod. Dolor ut exercitationem in vitae vel cupiditate. Quo doloremque eos voluptatibus est voluptatem et et. Enim sed possimus blanditiis.\n\nSoluta in dolorem quibusdam cumque animi qui. Vitae quo sunt a hic alias quia ut alias consequatur. Et non neque.	Horizontal	1331149	2070737	Entregue	0	17	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.11258+00	\N	\N
171	9	Parque Lagos Albuquerque	Maxime enim ut dolorem ut sapiente minus atque beatae. Laborum tenetur voluptas eum. Tempora fugiat minus tempore ipsam aut blanditiis voluptates placeat inventore. Facere magni iste sequi fuga eum porro.\n\nAd eius blanditiis rerum voluptatibus. Et consequuntur eligendi eligendi sit qui eum quia consequuntur. Totam impedit ut tenetur saepe perferendis enim dolor. Sit sint distinctio ipsa minima occaecati laborum.	Horizontal	1766010	2168244	02/2028	0	3	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.112598+00	\N	\N
172	3	Vila Garden Moreira	Sapiente voluptatibus nulla incidunt omnis porro eveniet. Laborum consequatur qui voluptas qui vero. Accusantium porro molestias. Incidunt voluptates porro id illo nisi tenetur tenetur qui ullam. Qui aut iure.\n\nPerferendis est qui consequatur. Ratione et sapiente animi consequuntur aut esse. A cumque velit. Laudantium ratione illum quis voluptas voluptas. Praesentium repudiandae voluptate quasi et qui dolorem assumenda commodi id. Earum enim adipisci voluptatem ut enim similique aut quo.	Vertical	728415	914713	01/2029	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112618+00	\N	\N
173	1	Ville Unique Braga	Dolorem autem totam velit beatae reiciendis eos possimus corporis impedit. Et omnis modi officiis ut et et. Non architecto natus eos doloremque.\n\nMaiores aliquam et tenetur ducimus porro quas. Necessitatibus vel aspernatur sint similique necessitatibus sit aut vel. Est voluptatem quis vero dolorum repudiandae et. Eius sed qui corporis tempora aut aut quibusdam. Et quae iure animi consequatur repudiandae. Modi alias nulla id ut illo sunt veritatis.	Loteamento	128666	235729	Pronto	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112642+00	\N	\N
174	10	Plaza Lumina Batista	Repudiandae tempora neque non delectus consectetur sunt aspernatur consectetur expedita. Omnis architecto nulla non occaecati rerum. Earum nihil animi dolore cumque dolorem. Temporibus vitae quam.\n\nAut quibusdam animi id occaecati eveniet qui. Dicta veniam sed nisi perferendis facilis quos veritatis libero vitae. Dicta cumque sint accusamus atque voluptatem impedit. Culpa magnam assumenda et voluptatibus adipisci est.	Vertical	1212415	3193654	Pronto	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112664+00	\N	\N
175	5	Torre do Sol Oliveira	Aut illo repudiandae minus voluptates asperiores a expedita. Mollitia reprehenderit numquam quae eveniet reiciendis sequi. Nihil eum atque sapiente voluptatum est.\n\nDolorem eos aut. Sit facilis sunt unde aliquam sequi cum sapiente. Id velit omnis ad et necessitatibus sed dolorum.	Vertical	1472065	2407398	Entregue	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112683+00	\N	\N
176	1	Torre Horizon Barros	Voluptas et cupiditate quia. Molestiae nihil omnis dolorem. Ut doloribus ex. Est nam voluptatum eaque quis quae. Enim vitae illum. Ab quia sed aut veniam et iusto.\n\nNecessitatibus amet qui praesentium iusto. Dolor molestiae doloribus in est qui delectus. Voluptas non ut soluta deserunt deleniti fugit vero adipisci. Consequuntur dolores sunt enim in eius corporis necessitatibus maiores velit. Aut voluptatem consequatur in est delectus nesciunt sed voluptatibus.	Vertical	936169	2236981	Pronto	2	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.112697+00	\N	\N
177	7	Edifício Exclusive Reis	Eveniet inventore excepturi illum nostrum. Sint quaerat libero consequatur ipsa. Laboriosam ut sed doloribus autem quibusdam voluptatem natus odio iusto. Qui saepe porro enim nulla officia facere. Atque et itaque nam eos.\n\nConsequatur voluptas deleniti. Consequatur aut est voluptates voluptate et quia aperiam. Voluptatem rerum doloremque aut ipsum id animi ducimus qui nesciunt. Sint et quia magni. Consectetur in tempora quis sunt dolore nostrum voluptatem doloremque. Aut soluta enim debitis aut ea rerum enim.	Horizontal	635431	1240603	Pronto	0	8	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.11272+00	\N	\N
178	10	Complexo Bela Vista Oliveira	Animi repudiandae mollitia quaerat eos repellendus voluptate et qui. Rem sapiente illo aut. Enim vitae ut ut autem.\n\nAccusamus magni molestiae nemo veniam voluptate suscipit voluptatum ut totam. Quas maiores qui accusantium rerum voluptas reiciendis suscipit. Ea minus reprehenderit repellat molestiae. Provident et aspernatur vitae vel iusto. Accusamus eos et et qui alias repellendus magni iusto. Esse sunt nam doloremque porro magnam error.	Horizontal	910379	1525637	Entregue	0	12	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112744+00	\N	\N
179	8	Vila Prime Moreira	Neque autem est dignissimos. Maxime veritatis neque aliquam vero laboriosam fugiat alias. Eligendi quidem sed reiciendis dolore qui. Illum accusamus fugiat velit voluptatem. Quisquam ut exercitationem vel minima ut ad odit aperiam magnam. Qui qui odio officiis ducimus non suscipit et.\n\nLibero omnis qui voluptas ut quia repudiandae. Nobis quia aut vel perspiciatis officia corrupti suscipit dolorem. Dolores nulla corporis voluptate sed dolores dolores iure.	Horizontal	1572273	2628640	09/2028	0	17	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.112766+00	\N	\N
180	5	Vila das Flores Martins	Consequatur repellendus voluptate officia repellendus dignissimos. Ducimus dolor voluptas aut inventore. Eius eaque iusto occaecati eaque distinctio rerum aspernatur doloribus. Quibusdam laudantium alias et quas praesentium.\n\nRecusandae voluptatibus velit. Quia reprehenderit ut. Alias consequatur enim consectetur non nulla. Sunt enim impedit quod earum incidunt. Eius voluptatem rerum autem minima provident mollitia.	Vertical	1481301	2292191	Entregue	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112787+00	\N	\N
181	5	Jardim Bela Vista Santos	Tempora aperiam voluptas sint laborum fugiat. Eos velit inventore atque maiores ea. Et aut tempora illum nemo nemo laudantium porro et. Fugit omnis odio velit. Cupiditate iure quia qui ut sunt eos quo ad.\n\nVoluptatem et rerum. Fugit ut id vel assumenda deleniti tenetur ab omnis est. Enim ut enim at ut sed velit. Amet consequuntur quibusdam qui aut impedit.	Vertical	1405640	2239851	Entregue	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112805+00	\N	\N
182	10	Vila Acqua Xavier	Maiores maxime repellendus totam nisi dolores qui aut est nisi. Vero vero aut natus nam exercitationem quis aliquam. Similique ut consequatur repellendus corrupti minima. Ut eum dignissimos deserunt deleniti rerum officiis officiis deserunt rerum.\n\nNobis dolorem rem. Quia accusantium voluptates. Quae aspernatur aut laudantium. Distinctio quas dolorem quia quisquam illum consequatur iusto minus.	Vertical	1290118	2069400	Entregue	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112825+00	\N	\N
183	9	Jardim Horizon Carvalho	Explicabo qui assumenda qui non ea non. Ut ratione pariatur dolore sit sapiente alias provident beatae nemo. Sed mollitia mollitia aut labore et quod qui. Dolorum suscipit error. Ullam ut necessitatibus expedita vel ea.\n\nVeritatis quia voluptate adipisci blanditiis ad in. Odio sunt ea minima eligendi veniam. Inventore voluptatem aut corporis tenetur hic molestias odio. Corporis eos unde ab delectus. Nihil blanditiis dignissimos tempora quia a eos quae.	Horizontal	1683130	2769676	Pronto	0	8	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112843+00	\N	\N
184	2	Parque Di Roma Moraes	Aliquam iste provident sed et. Rerum quam omnis excepturi sit fugit quia. Magnam deleniti tempore minus et rerum. Necessitatibus incidunt doloribus molestiae accusamus recusandae.\n\nEsse repellat corporis id earum qui autem nobis. Dolore neque perferendis. Dignissimos quaerat earum quaerat animi eveniet occaecati perspiciatis. Voluptatem recusandae autem hic sit omnis placeat aut. Quo animi magni ipsum enim enim nemo unde.	Vertical	1111583	2403817	Pronto	5	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112865+00	\N	\N
185	5	Condomínio Imperial Reis	Culpa quod minus ut porro vitae maxime sit. Distinctio repellat est dolorem aperiam explicabo reprehenderit quos ut ut. Fuga laudantium est tenetur. Dolor delectus rem et vel facere sit doloremque sint et. Ut eum ut quam maxime.\n\nSapiente aspernatur reprehenderit molestiae non rerum nobis nobis qui porro. Quia aperiam quae ut sunt distinctio deleniti. Minima rerum similique.	Loteamento	125366	182862	04/2029	0	2	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.112885+00	\N	\N
186	6	Vila Bela Vista Costa	Nobis voluptatem ea ab corporis repudiandae exercitationem officia est. Exercitationem qui nam magni consectetur. Animi aut eos deserunt. Ipsam repudiandae a ipsum ea id ullam. Voluptas et totam dolores voluptatibus provident. Neque tenetur harum ipsa modi ipsum dolorem quis est odio.\n\nMolestiae blanditiis consequatur non dicta. Est veniam sunt consectetur. Et corporis ab et officiis est ea modi. Dolorem soluta et natus quidem saepe nam nobis id. Quas iusto sed. Soluta ab totam.	Horizontal	1429832	1727571	Pronto	0	18	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112904+00	\N	\N
187	8	Plaza Vision Carvalho	Quo aut in repellendus deleniti sed dicta ut suscipit. Et ea modi voluptates animi occaecati voluptatem exercitationem vel. Numquam beatae aut culpa voluptas ut eum recusandae aut unde. Nostrum sint eum fugiat debitis blanditiis cupiditate id deleniti rem.\n\nUt et doloremque tempora corrupti officia quia molestiae. Necessitatibus cupiditate numquam dolor autem unde exercitationem sit vero. Illo dicta atque temporibus expedita odio omnis veniam est aliquam. Ipsam molestiae error et odio eligendi debitis veniam aut. Maxime officiis nihil qui ducimus recusandae.	Loteamento	166276	361326	10/2026	0	13	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112929+00	\N	\N
188	10	Residencial das Flores Martins	Exercitationem expedita minus officiis ea modi sunt et dicta deserunt. Aut unde quia magnam. Quo praesentium ut ducimus doloribus nisi nam iusto sit.\n\nSimilique aut temporibus maxime omnis dicta. Veritatis nobis possimus ut sed adipisci suscipit fugiat. Voluptate aspernatur dignissimos aliquam incidunt occaecati omnis quaerat. Eos velit aspernatur enim. Occaecati veniam enim et sit explicabo. Voluptatibus est autem quia magni.	Vertical	616007	1315049	Pronto	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.112954+00	\N	\N
189	10	Vila Premium Oliveira	Expedita hic rem velit sit sequi illum hic. Delectus beatae et cumque magni dolore ipsum similique. Distinctio aspernatur alias rem natus autem officia laboriosam illum sed. Fuga ut architecto dolores et explicabo at. Tenetur eos neque reprehenderit omnis dolores ut beatae autem qui.\n\nCommodi aliquid earum laborum nulla. Quaerat error iusto dolorum officia explicabo fugiat quod rem dolor. Nulla ut facere quo quam et optio magni non. Dolores alias iusto quaerat dignissimos voluptatibus.	Horizontal	910934	2172112	Entregue	0	6	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112975+00	\N	\N
190	5	Residencial Exclusive Moreira	Vero quod deserunt neque. Est libero dolor a deserunt. Blanditiis ut sit enim voluptatum animi dolor libero accusantium voluptatibus. Quia corrupti recusandae omnis et.\n\nQuia sit id dolore illum voluptatem aut. Aut sed molestiae ab mollitia quia explicabo libero. Minima cupiditate illo autem accusantium recusandae quia quo laboriosam. Corrupti distinctio iure. Sequi voluptatem sed quod sunt.	Vertical	1467266	3385806	05/2028	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.112998+00	\N	\N
191	9	Residencial Paradiso Braga	Et et nesciunt animi quia laboriosam quibusdam. Et iure qui minus nostrum voluptate illo exercitationem. Ad est sunt velit odit labore et animi assumenda ut. Voluptate quia temporibus.\n\nNostrum sequi quis nulla ea magni dolore dolorem. Officiis aut quas eius. Temporibus illo at expedita dolorem est hic numquam.	Loteamento	235830	379865	Entregue	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113017+00	\N	\N
192	9	Jardim Oasis Melo	Qui tempore id magni culpa voluptatum autem dolor dolorem dolorem. Sunt nam ut sapiente vel. Sed officiis dolores iste veniam tempora labore.\n\nVoluptas ex rem esse voluptatem. Tempore beatae perferendis repellat itaque fugiat. Ab aliquam ut ipsum.	Vertical	567322	2195403	07/2028	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113033+00	\N	\N
193	8	Jardim Imperial Carvalho	Quas quae incidunt sit ut officiis perspiciatis qui ea nulla. A mollitia nihil ea qui accusantium non. Eum debitis est quod reprehenderit explicabo necessitatibus illo necessitatibus. Reiciendis unde nihil. Exercitationem aut et facilis omnis quis facere nemo mollitia.\n\nMagnam accusamus magni consectetur ab. Reprehenderit est deleniti quo nihil sit. Voluptatum nihil laborum a vel ut doloribus. Eum iste quia. Iste corporis incidunt omnis quidem molestiae est labore est.	Horizontal	603364	833045	05/2029	0	2	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113046+00	\N	\N
194	2	Jardim Imperial Braga	Nostrum et consequatur asperiores omnis commodi corrupti occaecati quia. Quia ea necessitatibus minus sit accusantium saepe amet. Aliquam quia facere quisquam dignissimos.\n\nFugit eaque delectus et doloribus autem aliquam voluptatibus omnis fugit. Repellat ut quae non perferendis eligendi omnis saepe iusto. Excepturi repellat quibusdam voluptas dolorem quo. Vero consequatur officia at consequatur. Porro molestiae quo necessitatibus facilis sed maiores vero. Consectetur dolores accusamus ab ipsa.	Vertical	686150	1974221	Entregue	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113069+00	\N	\N
195	7	Jardim Premium Franco	Occaecati itaque sed ea molestiae voluptatem atque error. Nihil sit rerum. Velit blanditiis sapiente vel magni nostrum id suscipit accusantium quia. Atque et est consequuntur aut id. Labore esse sunt. Esse repellendus voluptatibus dignissimos.\n\nSint quo perspiciatis fugiat nihil et. Perspiciatis beatae illum assumenda. Eos aut possimus optio nostrum. Voluptatem dignissimos qui ipsam corrupti est repellat.	Vertical	1020951	2593369	04/2028	2	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.11309+00	\N	\N
196	3	Jardim Exclusive Reis	Dolorem repudiandae assumenda perferendis aliquam molestiae facere. Numquam nihil voluptas ut illo pariatur dignissimos quidem. Quia molestias nesciunt.\n\nVoluptas consequatur quod provident sit necessitatibus ad quo qui natus. Suscipit natus dolorum et. Enim vel quo est saepe magnam autem. Et nostrum voluptas nemo debitis itaque. Qui modi sed tenetur nihil at ipsam tempore exercitationem.	Horizontal	1640624	2590905	04/2028	0	5	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.11311+00	\N	\N
197	3	Spazio Oasis Carvalho	Consequuntur corporis pariatur nisi modi corporis sit. Consequatur enim adipisci voluptatum sint. Occaecati atque cupiditate tenetur.\n\nCommodi inventore illo delectus. Id molestiae error modi. Fugit molestiae laudantium in quis quisquam cum. Explicabo beatae sit eum et non aut ut mollitia. Voluptates et possimus impedit. Reprehenderit libero blanditiis numquam consequatur quia et similique est aliquid.	Horizontal	1746399	2789428	Pronto	0	10	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113128+00	\N	\N
198	2	Edifício Premium Silva	Minima laborum quisquam fuga voluptas enim ipsa qui enim. Tempora sit rerum. Exercitationem sit est.\n\nVoluptas est et reprehenderit quos et tempora fugiat. Velit suscipit fuga sed velit. Maxime officiis exercitationem maiores aut.	Horizontal	568399	1228680	07/2028	0	9	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113148+00	\N	\N
199	1	Jardim Premium Nogueira	Delectus dolor at quia consequuntur earum ab magni quaerat illo. Iste dolor omnis. Quis numquam non repellat ad veritatis. Minus et et ipsum corporis.\n\nQuis cumque et. Sunt nihil et error voluptatem enim. Ullam incidunt nihil officia. Dolorem nostrum qui fuga sunt laborum quo aliquam omnis laboriosam.	Loteamento	106049	267263	09/2026	0	14	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.11316+00	\N	\N
200	1	Edifício Oasis Moreira	Sunt cum accusantium illo et. Ducimus illum ut tempora molestias molestias voluptatem reprehenderit. Quia nam possimus recusandae rem. Occaecati vel saepe magnam. Placeat omnis quod ratione eos. Laborum ex facere asperiores ipsum iste.\n\nQuis rerum distinctio debitis dolores accusantium sequi unde non. Ut tenetur voluptas a et quia dolores quod qui. Ducimus et quo quidem voluptatum rem quia repudiandae. Sint voluptatibus consequatur architecto cum voluptatem sint. Illum voluptas quod a tenetur voluptas omnis.	Loteamento	294073	422763	07/2027	0	17	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113177+00	\N	\N
201	3	Plaza Imperial Silva	Perferendis odit et aut adipisci porro. Vero aut quidem sint corporis est maiores molestias voluptas iure. Optio sit similique omnis doloribus molestias rerum id perferendis. Et voluptate minus aut possimus non quia excepturi. Veritatis excepturi et qui et velit quaerat voluptatibus et quibusdam. Odit quo voluptatibus.\n\nConsequatur exercitationem consectetur ad quia. Officiis aut dolorum et. Illum dolores aut ut beatae possimus tenetur. Itaque quos vitae vitae quasi et explicabo aspernatur ipsum. Repellendus ut accusantium adipisci temporibus omnis.	Vertical	1085040	1515318	Pronto	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.1132+00	\N	\N
202	2	Vila Lagos Barros	Quia modi qui. Quos iste quia eius provident impedit expedita porro. Id velit molestiae in ut. At enim similique est rerum sit recusandae inventore id quasi.\n\nQui adipisci reprehenderit occaecati facilis ipsum. Ut recusandae voluptatum error consectetur iusto alias voluptas provident magnam. Consequuntur ea voluptas quas sunt voluptas. Et sint aut ratione eligendi reiciendis.	Horizontal	1068308	2470193	02/2027	0	3	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113226+00	\N	\N
203	5	Plaza das Flores Carvalho	Minus eaque veritatis. Dolorem aliquam expedita quia possimus tempora sit voluptates itaque. Nulla expedita est perferendis totam. Odit officia nesciunt.\n\nVoluptas ullam recusandae. Nihil minima modi. Ut porro unde quia. Sapiente molestiae et. Quaerat in vel ex.	Loteamento	137915	292038	Entregue	0	5	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113244+00	\N	\N
204	3	Plaza Prime Silva	Consequatur quas asperiores commodi culpa error commodi sunt laudantium dignissimos. Qui velit vel rerum eius. Doloremque enim assumenda sunt laudantium molestias dolores. Iusto aut sint fugiat quasi. Et sed repellendus cupiditate excepturi inventore hic.\n\nVel doloribus et voluptatem fugiat aut excepturi quasi. Cumque minima eos earum aut et. Necessitatibus est qui possimus explicabo et repellat consequuntur.	Loteamento	261737	370735	03/2027	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113259+00	\N	\N
205	10	Jardim Vision Carvalho	Dolorem dolores quod atque ad cumque. Eligendi magni corrupti quos est unde sunt. Laudantium eius consequatur facere. Similique aliquid quia debitis deserunt facilis et. Dolore repellat deserunt delectus sint voluptate. Ut inventore repellat voluptates explicabo asperiores ut velit id cum.\n\nEst quo non et enim et quidem optio. Porro exercitationem eum quae aut aliquid ipsa beatae debitis aliquid. Quas sit ipsum et doloremque. Consequatur dolore dolorem. Dolore corrupti aut sapiente. Perspiciatis ipsum velit in sint ut debitis voluptatem.	Loteamento	223768	275129	04/2029	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113278+00	\N	\N
206	1	Torre Garden Carvalho	Tenetur maiores dignissimos quia occaecati nam eligendi perspiciatis. Labore nihil nulla eius quas. Ut quo ad omnis consectetur enim ipsum id ipsa. Temporibus accusantium cupiditate earum dignissimos.\n\nEum cumque quis quisquam et repellat. At consequatur ut reprehenderit totam. Expedita perspiciatis dolorem adipisci repellendus earum. Dolorem labore sint perferendis nihil tempore nesciunt. Accusamus asperiores aut numquam repellendus et praesentium.	Horizontal	1714063	2004123	04/2029	0	3	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113303+00	\N	\N
207	3	Vila Lagos Albuquerque	Voluptatem repudiandae voluptate et nemo dignissimos ipsa. Eos alias ipsum ut numquam aliquid ut quaerat sed exercitationem. Ullam velit voluptas.\n\nMaiores tempora voluptates veritatis commodi sint et eos. Omnis velit sint ut et omnis a iusto mollitia. Eos sint ipsa voluptas quo tempora quasi. Voluptatem qui minus ad voluptas vel voluptatem quia. Voluptas cum numquam et voluptatem inventore. Non numquam molestiae illum vitae est et in dolorum.	Vertical	1289125	2787272	Pronto	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113323+00	\N	\N
208	8	Ville Premium Martins	Vero nihil minus quam quia molestiae. Nam aut nobis qui qui distinctio aut ea placeat. Quia et magnam similique corporis ut non quaerat modi voluptas.\n\nLaboriosam voluptate soluta alias est ex enim fugit. Maiores incidunt rerum quia voluptas. Beatae est repudiandae sapiente. Non alias maxime eveniet quidem rem aut dolores inventore. Est explicabo repellendus ea.	Loteamento	279178	384108	Pronto	0	12	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113345+00	\N	\N
209	5	Ville Vision Oliveira	Minus quis dolores eius mollitia eveniet quia culpa. Exercitationem corporis numquam accusantium et omnis. Voluptatem similique vel explicabo error eos rerum. Inventore explicabo et. Iure ut necessitatibus iste adipisci est iste inventore. Quo sint sunt praesentium nam nihil rerum atque corrupti.\n\nAutem error voluptatem est eaque qui est ex cum et. Quo molestias numquam aliquid aliquid qui culpa amet. Quos et ut eveniet sed.	Vertical	1332457	2043742	09/2028	3	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113363+00	\N	\N
210	8	Vila Bela Vista Carvalho	Nobis minima inventore quia alias. Delectus tenetur atque voluptatum molestiae. Unde eligendi expedita. Dolorem vel ut qui amet aliquam. Aut esse provident rerum laboriosam.\n\nDucimus quae magni quia eveniet vitae ea. Iusto dolor quae nobis qui dolores fugiat libero sequi. Et iure sint itaque. Quidem maxime aut. Et quis rerum et rerum nihil. Dolor non ullam nesciunt quidem nesciunt provident consequuntur odit autem.	Horizontal	502313	1087993	Pronto	0	17	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.113384+00	\N	\N
211	8	Parque Central Moraes	Enim fugit voluptatem ut. Velit ab voluptas id consectetur eos impedit aliquid exercitationem nobis. Suscipit ipsum et aut odit. Aut id ex omnis accusantium blanditiis voluptatem tenetur consectetur. Iste nisi sit neque vel maxime explicabo itaque ut unde. Ut pariatur mollitia quis.\n\nNostrum ut voluptatem voluptas. Natus doloremque et voluptas. Non tenetur odio omnis modi vero. Itaque pariatur et voluptate rerum eum. Aut veritatis dolorem adipisci neque eos odit. Fugiat a placeat qui.	Loteamento	259169	325657	Entregue	0	13	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113405+00	\N	\N
212	7	Spazio Unique Xavier	Eaque autem quo. Corrupti ipsam saepe consectetur quam quisquam. Velit qui fuga quidem dolor rem inventore et.\n\nReprehenderit esse dolore sapiente dicta quia exercitationem libero molestiae. Ullam quis ut accusamus. Eveniet molestiae ducimus et.	Horizontal	1222184	2507776	10/2028	0	8	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.113429+00	\N	\N
213	1	Torre Prime Carvalho	Consequatur praesentium nisi id magnam. Quia corporis vitae omnis. Hic repudiandae cupiditate necessitatibus animi asperiores sed ad. Illum provident est est incidunt et ut quisquam.\n\nNecessitatibus possimus consequuntur veniam fuga quod ea. Architecto aut ipsa sed et doloribus. Et aspernatur veniam in facilis suscipit et. Occaecati et ut et ea. Nostrum quisquam sint ut inventore quis ducimus repellendus in eos. Voluptatem voluptas repellendus totam esse expedita voluptate nobis molestias.	Vertical	1158242	1834676	04/2029	2	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.113442+00	\N	\N
214	3	Condomínio das Flores Macedo	Ea consequatur iure iste eos. Temporibus libero soluta. Odio sint debitis.\n\nFuga impedit porro consequatur. Nostrum deserunt qui aut nesciunt. Et tempora animi dolorem saepe tenetur.	Vertical	1439296	2667009	Entregue	2	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113465+00	\N	\N
215	8	Maison Lumina Costa	Veritatis qui eos tenetur saepe id ad accusantium et. Maiores accusantium at earum ea iure vero ipsa provident. Et eum est sunt consequuntur nisi totam. Dicta optio necessitatibus quo id vel. Ut autem error nesciunt aut veritatis fugiat vitae architecto laborum.\n\nVoluptatem quidem quo. Odit eveniet animi placeat. Quas et debitis.	Vertical	1065772	1404876	04/2029	2	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113476+00	\N	\N
216	1	Vila Di Roma Pereira	In laboriosam nihil commodi non asperiores. Quos quod distinctio numquam ut perferendis quisquam. Reiciendis delectus quia vel voluptatibus voluptates quia. Doloribus odit quo sapiente voluptatem qui quaerat dignissimos. Sit odit excepturi nihil numquam vitae ex quos. Quam doloremque in culpa ullam et eos.\n\nAnimi in odio. Odit non qui harum veniam quas voluptatem ducimus sapiente. Numquam repellat blanditiis molestiae et sunt suscipit.	Horizontal	1779830	2067908	Entregue	0	10	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.113493+00	\N	\N
217	9	Plaza Exclusive Martins	Quod saepe numquam laboriosam non repellendus corporis. Rerum eos occaecati est eligendi totam quidem quod nemo et. Perferendis quia sed sit.\n\nQuibusdam necessitatibus sed explicabo quia exercitationem hic. Esse eveniet ut expedita impedit est quia consequatur qui assumenda. Et eos aperiam cumque ut neque dolore iure. Cum rerum assumenda. Qui dolor a non quis animi rem consequatur vel.	Horizontal	1147383	2184106	Pronto	0	13	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113515+00	\N	\N
218	3	Vila Natura Costa	Aspernatur id omnis corporis rerum ratione est qui est rerum. Eos a dolorem qui natus. Iste corporis voluptatum eligendi ducimus. Ab quod quis consequatur nihil minus.\n\nLaborum qui sunt ab rerum blanditiis ratione. Incidunt rerum iste explicabo sed eius consequuntur. In voluptates quam at enim totam qui nam a. Deleniti soluta natus non quaerat porro aliquid voluptatem consequatur quisquam. Et eum similique sit illo assumenda assumenda eos.	Horizontal	1227070	1821885	10/2028	0	16	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.113534+00	\N	\N
219	9	Spazio Exclusive Franco	Doloribus aut modi corrupti aliquid blanditiis. Rem accusamus et. Eum aperiam dignissimos asperiores atque fugit aperiam quidem dolorem. Expedita repudiandae libero corrupti sint ut occaecati provident nobis.\n\nAut voluptas nisi aut ducimus. Numquam ipsum et odio odit est nobis quisquam corrupti. Repudiandae debitis rerum. Enim facilis aliquid at cupiditate voluptatem sit dolor.	Vertical	681206	1179798	Pronto	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113556+00	\N	\N
220	2	Plaza Lumina Martins	Sint deleniti quaerat qui aliquam iste sit. Dolorem aut voluptatum qui ut omnis et ducimus. Distinctio reiciendis eveniet.\n\nAccusantium eius saepe. Ab neque occaecati officiis commodi illum ut ipsam non voluptatem. Voluptatem similique illo quia.	Vertical	750770	2059299	Entregue	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113574+00	\N	\N
221	7	Edifício Garden Carvalho	Dolor cupiditate a qui sunt pariatur. Dolorem quam expedita rem et id. Odio fuga est est. Id ab deserunt ipsam repellat suscipit et. Exercitationem consequatur aut nam inventore aut dolor libero.\n\nEos nam consequatur consectetur velit. Corrupti enim repudiandae vitae odio in rerum id dolores. Magnam impedit deserunt soluta ex et et voluptatum libero. Totam eum quibusdam odit nisi ratione tempore neque esse aut. Cum qui aut eius quas totam aliquid. Tempora repudiandae hic labore animi praesentium.	Loteamento	166994	270837	03/2029	0	5	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113586+00	\N	\N
222	2	Edifício do Sol Braga	Eius et recusandae id quae rem vitae quis. Ut itaque laboriosam ut dolorem nemo quidem atque voluptatem. Eligendi sapiente ut est repudiandae inventore et ea officiis eaque.\n\nDolorum libero maxime et quaerat pariatur nam vel. Nihil veniam quisquam rerum porro aut quam aliquam dolore. Quaerat consequuntur quia eum pariatur eos eos nisi ullam.	Loteamento	265151	430068	11/2028	0	11	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113611+00	\N	\N
223	2	Maison Oasis Santos	Eum expedita voluptatem. Dolorem aut ad modi. Ducimus sit vero sapiente neque quibusdam dolorem.\n\nVoluptatem qui voluptas veniam velit reprehenderit. Et exercitationem quod expedita. Labore ipsam dolore id ut asperiores error accusantium labore. Rerum libero nihil suscipit sit quia architecto voluptas minima. Aut officia illum doloribus nobis aut earum eaque nihil illum.	Horizontal	1964032	2568071	Pronto	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113628+00	\N	\N
224	11	Ville Borges Moraes	Sunt est aperiam id soluta qui earum architecto in iure. Eum et ab in consequatur eligendi eveniet natus. Impedit est perspiciatis molestiae iure aut numquam non accusantium pariatur. Dolor omnis est. Nihil aperiam saepe. Enim assumenda laboriosam.\n\nAut hic sit aperiam excepturi saepe placeat autem. Natus tempora optio quo temporibus enim cumque. Quaerat tempora laborum perspiciatis culpa excepturi.	Vertical	367858	1240504	12/2027	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113647+00	\N	\N
225	11	Residencial Lumina Carvalho	Hic sed repellendus iusto est accusamus ea ut. Illum voluptatem deleniti. Quis quas qui voluptatem eos perspiciatis id nesciunt. Ut eum libero repellat autem excepturi rerum. Harum eveniet adipisci et. Aut nam qui qui voluptatum quod aliquam.\n\nBeatae veritatis ea dolor accusamus vitae possimus similique. Iusto perspiciatis dignissimos minus dolor autem dignissimos et minus laboriosam. Repellendus et ut repudiandae quam. Minus incidunt adipisci. Et quos recusandae et consequatur natus temporibus accusantium quibusdam. Quam rerum hic explicabo sed quibusdam.	Loteamento	146675	305754	11/2028	0	3	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113667+00	\N	\N
226	6	Spazio Central Batista	Aut nihil dolorum labore impedit qui. Aperiam beatae et consectetur quaerat vel quaerat. Repudiandae id ducimus provident.\n\nEa mollitia veritatis quis aut quia illum delectus. Doloribus vel qui magnam rerum qui non. Dignissimos doloremque dolores amet consequatur vitae maxime repellat.	Loteamento	160189	348358	01/2028	0	12	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113692+00	\N	\N
227	8	Spazio Bravie Batista	Provident cupiditate cum eum. Delectus officia sint consequuntur. Distinctio voluptates dolor. Culpa omnis et itaque. Facere quia ab consequuntur nisi reprehenderit distinctio id aut. Quos voluptatem iusto placeat rerum eum.\n\nConsequatur voluptas voluptas dolor. Inventore provident velit. Quis deserunt totam et enim quas. Magni autem voluptatem repellendus ea dolorem deleniti voluptatibus voluptatem. Dolores nulla fugiat eum nesciunt magni sit.	Horizontal	1737555	2717010	02/2027	0	4	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.113707+00	\N	\N
228	3	Plaza Exclusive Xavier	Sint in id neque velit eos recusandae. Dignissimos hic culpa fuga. Molestias rem delectus ab vel possimus minima dolor illum dolor. Ducimus a assumenda voluptatem alias quia. Veritatis ut est aliquam enim.\n\nOccaecati ab placeat a. Sit quia veniam ut doloremque consequatur quas iure officiis fugiat. Suscipit rem tempore hic non beatae ut. Ducimus debitis libero ipsum ut quaerat nostrum repellendus et qui.	Vertical	745445	1171093	Entregue	5	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.113727+00	\N	\N
229	6	Plaza do Sol Carvalho	Laboriosam sapiente magni. Maiores quisquam consequatur nostrum fugiat quisquam. Nostrum earum quaerat consequatur iusto minus autem exercitationem.\n\nOmnis necessitatibus autem rerum asperiores maxime culpa doloremque. Dignissimos quasi repellat maiores ea vel. Totam commodi voluptate. Enim veritatis aut dicta provident repudiandae. Et ipsam et quasi modi qui optio numquam.	Horizontal	1600279	2706046	Entregue	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113747+00	\N	\N
230	4	Residencial Vision Braga	Consequatur et cum quaerat magni. Error enim autem eaque asperiores dolores fugiat. Pariatur et sit in id est.\n\nInventore architecto vero aliquid sed ut ipsum. Debitis officiis sed eligendi aut doloremque. Assumenda saepe illo ipsa vero. Nisi ea quae animi et sunt vel voluptatem. Accusantium sit commodi porro quae voluptatibus est. Nesciunt quasi quia.	Horizontal	1518269	1920436	Entregue	0	18	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113763+00	\N	\N
231	4	Spazio Bela Vista Carvalho	Cupiditate enim et blanditiis modi incidunt molestiae voluptas. Quis et aliquid. Sunt hic consequuntur enim et fugiat dolorum.\n\nAssumenda commodi voluptates culpa asperiores quia aut incidunt aliquid est. Dolor minima et totam libero. Quo et sunt aut molestiae assumenda ut quibusdam cumque ad. Sed est nulla provident maiores beatae voluptatem vel necessitatibus cumque.	Horizontal	1723870	2735413	07/2029	0	18	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113782+00	\N	\N
232	5	Jardim Lumina Moraes	Harum architecto consectetur maiores cumque dicta qui est eius. Sed aliquid consequatur. Enim et omnis nemo minus consequuntur magni sit eos. Dignissimos et quia deleniti voluptatem quibusdam officia asperiores fuga. Sed tenetur nemo consequatur eaque cum perspiciatis ut ullam id.\n\nBeatae magnam quia vitae vitae hic. Nam minima minus numquam quis ea. Et facilis excepturi neque. Maxime adipisci dolores dolorem dolores officiis laboriosam aliquid. Aperiam debitis voluptatem quibusdam et.	Horizontal	624792	1714855	08/2027	0	2	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.1138+00	\N	\N
233	11	Spazio Exclusive Santos	Ullam recusandae atque earum architecto quae reiciendis. Enim et aut explicabo quisquam. Magni minus laborum. Odio qui aut nostrum dolores expedita. Libero repudiandae tempora voluptatum voluptas exercitationem et molestiae autem. Quaerat quos et voluptatem corporis facere.\n\nIllo voluptas et aut occaecati voluptas soluta sit ratione. Vel laborum soluta atque cumque quidem quod. Velit voluptas atque repellat et quos accusamus voluptatum est fugit.	Horizontal	1364778	2511984	02/2027	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.113823+00	\N	\N
234	2	Complexo Exclusive Moreira	Ullam rem repudiandae aut et. Impedit possimus temporibus qui est inventore consequatur ducimus. Autem aut quia aut sed. Beatae rerum est consequatur animi et.\n\nSuscipit consectetur nulla possimus nemo nam neque aut. Est itaque ea tempora et aut libero. Optio minima ut reprehenderit debitis. Est corporis voluptate. Eos consectetur quasi tempora. Non aut atque rerum esse.	Horizontal	594088	1148656	05/2028	0	7	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.113843+00	\N	\N
235	5	Ville das Flores Xavier	Explicabo id et voluptatem. Et voluptatem et. Quis ad assumenda aliquam quibusdam dolore. Incidunt aut voluptatem enim illo ipsam qui. Architecto sit porro.\n\nTempora rem et. Ipsam rerum sint et quia quasi excepturi voluptatum eligendi autem. Commodi numquam expedita.	Loteamento	174806	332061	Pronto	0	4	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113862+00	\N	\N
236	5	Residencial do Sol Moraes	Neque repellat ex nesciunt earum dolorem debitis est ex aut. Iusto earum consequatur quae quia et. Animi tenetur qui alias nisi laborum reprehenderit nihil minus reprehenderit. Vel odit et eligendi sunt voluptate.\n\nEx et sit. Ullam nisi quam error et adipisci. Deleniti a optio velit et expedita dolores accusantium. Sint nulla assumenda consequatur. Rerum qui autem quia ut quam. Quis exercitationem ut aut qui adipisci ut non est.	Horizontal	684116	1417180	09/2027	0	3	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.113876+00	\N	\N
237	11	Torre das Flores Santos	Ea cumque provident autem. Distinctio reprehenderit iusto aut. Quia consequatur laboriosam qui aliquam tenetur quo dolores aut. Labore quam magnam nisi dicta ea sit laborum sed. Beatae explicabo inventore alias qui in.\n\nSunt ut placeat tempore molestiae odio doloribus. Culpa et eum tempore amet consequatur voluptate nihil ut. Qui eaque omnis enim aliquam accusamus mollitia enim aut rerum. Vero pariatur rerum qui molestiae quas voluptatum voluptatem atque minima.	Horizontal	944898	1355978	Entregue	0	13	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.113899+00	\N	\N
238	2	Parque Real Silva	Atque voluptatibus sint. Placeat cumque consequatur eos voluptas laboriosam vitae quis omnis illo. A quia dignissimos. Cupiditate quod voluptatem fugit non et eveniet est dolorem. Vel recusandae magni eos quo. Magni velit repudiandae molestiae voluptatem corrupti dicta.\n\nAperiam aut ipsam totam saepe. Sunt repellat minima. Molestiae culpa quam. Sunt illo esse alias voluptas veritatis sed consequuntur nihil ut.	Horizontal	1720312	2358628	Entregue	0	8	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.11392+00	\N	\N
239	7	Spazio Paradiso Moraes	Eos ad ex ea. Est deleniti quibusdam incidunt a eius et totam animi. Soluta similique et ad quidem aut. Excepturi sed inventore. Nemo voluptate et et accusantium tenetur ut soluta id.\n\nCulpa corrupti natus qui voluptatem. Maxime quam neque sequi quia voluptatem odit doloribus beatae rerum. Itaque suscipit dolorem maiores dolorum dolores.	Horizontal	1656606	2021780	11/2028	0	7	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.11394+00	\N	\N
240	5	Spazio Central Moreira	Cumque non sunt ad. Pariatur qui recusandae facilis reprehenderit ut quo. Atque earum omnis qui est voluptas excepturi quo. Quae molestiae non aspernatur sit est quia tenetur.\n\nSaepe dolore consequuntur occaecati ut consequuntur sint assumenda saepe. Est molestias natus ex sequi. Tenetur cupiditate delectus. Quos consequatur enim eius non rerum officia.	Loteamento	273215	447124	11/2027	0	10	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113958+00	\N	\N
241	7	Parque Prime Pereira	Facilis est voluptates et tempore. Architecto culpa eaque libero id quia velit animi adipisci at. Voluptates provident doloribus quas earum ut. Ducimus commodi consequatur alias. Ut quo est aspernatur omnis.\n\nOfficiis ut illum eius repellendus. Soluta aperiam est. Et non nemo fugit et occaecati iusto modi. Fugit ea voluptatibus officia et culpa repellendus voluptatem libero. Delectus natus impedit natus omnis.	Loteamento	292029	482861	05/2029	0	8	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.113976+00	\N	\N
242	4	Parque Unique Moraes	Nemo aperiam sint omnis. Quia voluptas impedit recusandae omnis voluptatibus inventore et. Natus explicabo eum iusto voluptates ut tempore soluta ex. Pariatur sed sed error ab quidem sint error. Sint velit occaecati sunt ipsum accusamus.\n\nInventore unde ut ea et voluptates consequatur omnis repellendus. Vel vel nihil vero doloremque ea minima. Autem impedit voluptate odit eos dolorum qui. Nostrum dicta facere facilis. Voluptates sint id eum praesentium officia dignissimos ut rem.	Vertical	665365	770669	07/2029	1	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.113996+00	\N	\N
243	2	Complexo Premium Melo	Debitis et ut quae cumque eum recusandae et enim vel. Sed aut laudantium neque sapiente. Nisi aut sint eaque est dolore suscipit porro reprehenderit et.\n\nUt dolorem omnis recusandae dolores velit. Minus rerum aliquam eum quo debitis omnis explicabo repellendus. Eveniet provident voluptatibus cum ut minima nesciunt similique totam. Repudiandae eos non dolore vel hic repellendus minus explicabo.	Horizontal	1330119	1535169	Pronto	0	12	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114018+00	\N	\N
244	9	Ville Oasis Costa	Et id sit et accusamus. Cum provident ratione tempora facere id aut natus. Voluptatem error sed vitae asperiores tempore facilis ad. Amet et mollitia alias sit tenetur voluptates eos quod ut. Nostrum ut architecto expedita. Non deserunt fugiat aliquam omnis est.\n\nDeleniti consequuntur odio. Et necessitatibus in aut numquam optio totam animi. Ab omnis est qui. Et similique repudiandae ut quisquam autem.	Loteamento	146375	314898	Entregue	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114037+00	\N	\N
245	1	Spazio Horizon Carvalho	Est et ipsa minima sit odit. Et cumque ut unde. Ratione possimus qui placeat eaque soluta doloremque. Quia at officiis fuga laboriosam velit saepe laborum. Harum sed dolores fugit assumenda dolor.\n\nEst aut est dolor impedit est a sit. Quibusdam id sequi rerum doloribus recusandae magnam vitae. Aut et ratione aperiam quidem optio recusandae aspernatur. Culpa qui dolorem fugit.	Horizontal	564178	999586	10/2026	0	7	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114058+00	\N	\N
246	10	Torre do Sol Silva	Repudiandae deserunt nemo eaque blanditiis aliquid culpa. Velit veniam id et inventore eligendi aut asperiores dolorem accusantium. Sunt ipsa nostrum reprehenderit qui architecto incidunt eaque velit. Nemo cupiditate autem. Quasi facere ab ut eum ea exercitationem dignissimos odio.\n\nIn mollitia praesentium tempora dolor error et et. Temporibus qui totam qui. Qui est odit eum nisi quo at sapiente. Cumque veritatis tempora quam. Maiores tempora laborum non ut hic nulla aut ipsum. Culpa voluptatem et doloribus esse voluptatem nobis.	Vertical	583048	1810164	10/2028	4	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.114078+00	\N	\N
247	8	Condomínio Premium Costa	Dolores omnis sint numquam nemo velit aut placeat. Aperiam ea quae mollitia voluptatem vitae dolorum distinctio. Ut ad non error. Perferendis est atque numquam molestias quasi. At iste ut sed enim voluptatem sapiente maxime eum magnam. Et vitae ullam numquam.\n\nEt aspernatur quis animi impedit. Quo quaerat blanditiis at. Et officiis laboriosam expedita qui est sunt.	Vertical	957193	2639168	Pronto	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114103+00	\N	\N
248	10	Edifício Acqua Santos	Vel quia sit sit quia voluptas accusantium temporibus. Blanditiis minus voluptatem aperiam aut eos deleniti sed tempora inventore. Pariatur porro ut hic aliquam. Quaerat quis quia natus sequi et autem voluptas eligendi laboriosam. Deleniti voluptatem aliquid.\n\nNihil illum alias magni qui et ut veniam ducimus beatae. Quia aut rerum a et amet. Omnis tempore occaecati dolorem cupiditate eligendi corrupti id et. Et mollitia enim aut nihil qui. Sed at rerum animi magni adipisci consequatur velit repudiandae. Voluptatum cupiditate est aut molestiae dolor dignissimos minima voluptatem itaque.	Vertical	486559	1984536	Pronto	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114123+00	\N	\N
249	4	Condomínio Real Melo	Deserunt distinctio tempora ipsa sit ullam tempora ut sunt. Quisquam soluta et consequuntur illo provident ab molestiae animi aut. Occaecati porro voluptatem. Saepe sunt possimus rerum dolorem magni repudiandae. Quo quia vero minus nihil odit ut aut aut laudantium.\n\nSaepe eligendi alias dolorum non cum dolorum. Tenetur ipsum quisquam nihil. Dicta enim corrupti explicabo est laborum repellat.	Loteamento	137172	286670	09/2026	0	13	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.11415+00	\N	\N
250	10	Residencial do Sol Carvalho	Delectus qui dolores neque eos itaque consectetur eos. Doloremque distinctio illo ea voluptatum omnis modi illum est. Facilis et ea amet cupiditate aut aut autem voluptatem. Iste facere non et. Nostrum magni neque.\n\nIure sapiente dolor. Neque et amet fuga quia quas similique odit. Eos et rerum cumque. Saepe quia rem aperiam. Et id sit nisi consequatur expedita. Id ut tenetur doloribus.	Loteamento	259157	327304	Pronto	0	10	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.114168+00	\N	\N
251	8	Edifício Borges Batista	Sapiente itaque iste nihil in rem pariatur debitis. Unde quod quibusdam asperiores vel. Fugiat nihil dolore quod aut eaque velit totam.\n\nUt nihil minus eos expedita. Saepe accusamus et. Dolore vel est placeat nam commodi.	Loteamento	139843	268868	Entregue	0	10	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114189+00	\N	\N
252	6	Ville Prime Xavier	Aut amet facilis voluptate ipsa et sint laudantium aut. Autem at sit soluta vel inventore hic dolorem sit. Laboriosam aut rerum sunt. Voluptas quis id alias error quibusdam enim est. At sit error.\n\nCorrupti dolores iure dolor omnis et est quo qui. Nam vitae dolorum culpa molestiae consequuntur consequatur. Natus minus molestias dignissimos praesentium illum.	Vertical	1142444	2473081	06/2027	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114202+00	\N	\N
253	10	Complexo Central Franco	Molestias ad qui esse. Doloribus beatae eum velit eos. Praesentium aut dolores. Soluta est qui ipsum quibusdam.\n\nVeniam ipsa illum ad maiores. Delectus error quasi. Tempora nam veritatis. Nihil ipsam unde. Cumque error sint laudantium sint sint eos.	Loteamento	250259	393054	10/2026	0	20	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.11422+00	\N	\N
254	11	Vila Oasis Carvalho	Vel dignissimos consequatur voluptas eaque eius aspernatur temporibus. Veritatis sed reiciendis temporibus. Optio in expedita qui in esse illum et error. Explicabo et illum quam.\n\nPerspiciatis harum id iste quam non quia sunt. Et suscipit porro occaecati qui et. Quis est eligendi perferendis.	Vertical	1255490	2306056	02/2028	1	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114235+00	\N	\N
255	4	Plaza Central Albuquerque	Et hic eos cumque at. Sequi exercitationem ut est ad dicta in nesciunt sit. Laborum in et. Deserunt fuga velit molestiae pariatur. Vero quod sint voluptate ratione neque earum sit.\n\nBeatae et amet. Maxime dolor eveniet animi non aperiam autem. Autem qui fugit quam nemo non. Impedit expedita sed qui temporibus iusto iusto.	Horizontal	1043839	2485751	Pronto	0	4	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.11425+00	\N	\N
256	6	Vila Oasis Nogueira	Eius a at ut repellat tenetur voluptas ut laboriosam. Reiciendis nulla possimus voluptatem et facilis. Nostrum in dolorum iure voluptatem consequatur vel nesciunt vero.\n\nMaiores et iste quo ut. Et iure aut illum quaerat placeat suscipit. Voluptatem provident sed ex quibusdam. Consectetur soluta dolores qui corporis totam id tempore ratione. Nemo nihil minus a ut incidunt voluptatem aut. Sapiente aut eligendi vitae est sed.	Horizontal	1620204	2408926	03/2027	0	9	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.114268+00	\N	\N
257	9	Condomínio das Flores Batista	Debitis libero sed corrupti pariatur deserunt omnis sapiente omnis blanditiis. Fugiat porro quibusdam necessitatibus blanditiis iusto qui est. Culpa nostrum et aperiam quia voluptatum id. Tempora minima velit a blanditiis velit minima. Esse aut nesciunt est omnis.\n\nQuis amet laudantium quis suscipit officia aliquid animi ipsa nihil. Officia qui odit aut. Natus est officia hic eum.	Loteamento	257993	361790	08/2027	0	14	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114289+00	\N	\N
258	6	Maison Vision Martins	Quibusdam consectetur dolor neque. Rerum sed iusto. Veritatis sint esse qui et nihil quibusdam alias. Et reprehenderit et dolorum debitis reiciendis voluptatem et accusamus.\n\nVeniam eum pariatur pariatur qui rem. Dolor sapiente inventore molestias laudantium et ut nulla. Similique quibusdam nihil quod. Natus quod quia praesentium et quia porro et repudiandae similique. Illo deserunt illo porro nihil aut ab ratione sit. Ut sed quia incidunt perspiciatis debitis dolore.	Vertical	1498405	3337067	11/2026	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114331+00	\N	\N
259	8	Torre Horizon Reis	Autem quia qui. Ipsa minima voluptatibus. Quia enim deleniti veritatis error omnis vero animi non ab. Labore ut rerum dolore vero architecto velit repellat odio praesentium.\n\nSit velit pariatur quam et quibusdam officia. Velit dolor placeat perferendis. Unde porro laboriosam quia nihil officiis aperiam consequuntur qui doloribus. Velit porro natus earum reprehenderit corporis voluptas nam velit. Blanditiis officiis voluptas tempore dolore aspernatur. Est consequatur sit.	Vertical	531094	1835671	Entregue	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114354+00	\N	\N
260	5	Vila Prime Pereira	Ducimus dolorem nobis eveniet. Soluta vero laudantium. Eius voluptatem ipsum. Sit eum qui. Ipsam repellendus est eum voluptatem reprehenderit dolore. Molestiae cumque eum deserunt nulla ratione.\n\nEt dolor et incidunt totam autem alias occaecati perferendis. Et incidunt harum doloribus omnis quibusdam. Quo deleniti repudiandae harum non. Eum qui non veritatis eum fugiat. Blanditiis eveniet porro optio architecto. Et doloribus labore vel id.	Horizontal	1520016	2192841	02/2028	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114377+00	\N	\N
261	1	Complexo Lagos Moraes	Explicabo consequatur nostrum ratione sed fuga nemo sequi voluptatum et. Blanditiis nobis distinctio velit minima. Numquam asperiores quis fugit sapiente animi ut perferendis aut. Culpa sed fugit animi vel error. Id nihil dolorem sint doloremque modi.\n\nEt laboriosam quia magnam. Dolorum earum sequi temporibus. Rerum id nam est libero. Cumque inventore voluptatum corporis ut quos esse. Est omnis quis sed eveniet iusto quia.	Vertical	1411636	2790173	07/2026	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114399+00	\N	\N
262	3	Ville Central Silva	Dolores itaque accusantium minima. Ea quo incidunt qui. Reiciendis non nulla delectus illo. Illo placeat odit placeat consectetur consequuntur repellendus animi debitis eum.\n\nExpedita laudantium et reprehenderit. Laborum vel quis itaque aut omnis dolores vitae. Voluptate aut ipsam nihil est voluptatum est.	Vertical	1257266	3039867	07/2027	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114421+00	\N	\N
263	9	Maison Imperial Batista	Odio eum adipisci suscipit beatae quaerat eligendi voluptatem vel. A nihil cumque culpa repellendus et quia quis error. Voluptatum praesentium nemo corrupti quia.\n\nSit sequi perferendis voluptatem iusto perspiciatis veniam sequi. Dicta eum consequatur omnis. Et repudiandae omnis eos quam sint.	Horizontal	1869944	3024826	Entregue	0	11	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.114435+00	\N	\N
264	4	Residencial Lumina Melo	Facere non voluptatem corporis recusandae. In aut autem dolores praesentium dolorem eum praesentium ratione ad. Quod sed voluptatem. Voluptas qui sint nisi est cumque nam odit eaque consectetur.\n\nPerferendis consequatur ut. Vel rerum rem quis excepturi velit non. Similique quia sit qui fugiat eos. Rem rem consequuntur illum dolor id omnis consectetur. Quo et possimus blanditiis impedit officia.	Loteamento	256827	395276	09/2027	0	9	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.114449+00	\N	\N
279	5	Maison Horizon Costa	Id sequi velit aut sit deserunt optio. Repellat qui qui beatae doloribus consectetur nobis unde. Accusantium adipisci facilis.\n\nNihil qui blanditiis et accusantium. Quis dignissimos eum tenetur quis quasi illo deserunt. Doloremque atque illum et voluptatum nesciunt et et earum. Ducimus et aut temporibus recusandae rerum et magnam impedit perferendis.	Vertical	330143	1738320	Entregue	1	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.114777+00	\N	\N
265	10	Ville do Sol Macedo	Nemo nostrum quasi repudiandae eum veritatis. Quaerat assumenda rerum impedit ea rerum et autem. Perspiciatis delectus ullam laudantium eaque placeat neque. Blanditiis recusandae doloribus deserunt minus iste temporibus sunt. Corrupti amet iure voluptas temporibus sint id. Corporis dolorem in in alias vel.\n\nAut provident id maxime facilis vitae eius. Ab aut natus accusantium non. Occaecati nulla labore corrupti quia. Incidunt quas cum natus non architecto maxime. Repellendus aliquid voluptas dignissimos praesentium. Dolor quos tempora perferendis et.	Horizontal	1354827	2332070	07/2028	0	5	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114498+00	\N	\N
266	1	Jardim Borges Silva	Reprehenderit inventore odit repellat dolore. Exercitationem porro aut consequatur minima aliquid beatae. Et non necessitatibus.\n\nQuam laborum consequatur. Iusto alias voluptatem eos consequatur nemo. In harum sit et sit. Eligendi odit officiis libero.	Horizontal	766703	1709091	Entregue	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114524+00	\N	\N
267	1	Parque Horizon Braga	Quas quae accusantium explicabo beatae similique. Cupiditate ut saepe sunt sapiente incidunt distinctio et perspiciatis porro. Inventore ex velit ea cupiditate et quia quia et voluptatem.\n\nEt voluptate porro dolor voluptatem saepe cumque molestias adipisci. Itaque quis esse laborum dicta itaque. Reprehenderit amet ab nostrum.	Loteamento	297025	378918	04/2027	0	17	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114537+00	\N	\N
268	1	Residencial Lumina Nogueira	Aut accusamus enim dolorum aut nostrum reprehenderit et aut laboriosam. Debitis iste impedit earum provident quibusdam saepe doloribus non. Nulla in id nisi exercitationem. Fuga vero non placeat doloribus totam.\n\nUnde et quis omnis sequi. Modi nemo molestiae perferendis. Esse et amet est unde accusamus.	Loteamento	129265	256184	Pronto	0	17	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114552+00	\N	\N
269	4	Torre Bela Vista Braga	Necessitatibus velit architecto. Qui exercitationem ab quis adipisci nam deserunt. Natus dolore ut et eos. Molestias quas deleniti similique.\n\nRecusandae voluptas aperiam possimus. Sunt praesentium tenetur quisquam sunt debitis optio optio. Aspernatur quam autem enim consequatur vel quaerat minus provident nisi. Et eaque sit dolores in laborum eos. Inventore qui quia et perspiciatis non dignissimos aliquam. Eum ex inventore quia ab labore ullam impedit et.	Horizontal	709107	1129348	Entregue	0	2	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114567+00	\N	\N
270	8	Plaza Paradiso Reis	Totam qui itaque molestiae. Excepturi ut non voluptate voluptatem qui voluptas quia. Sit ea non accusantium ut aut esse est.\n\nEos rem est nulla hic alias at. Vero qui autem et. In corporis nostrum reprehenderit nihil. Eos dolorem recusandae. Recusandae tempore voluptas dolorum saepe excepturi et architecto.	Horizontal	610667	2072629	07/2027	0	13	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114589+00	\N	\N
271	2	Residencial Bravie Braga	Voluptatibus qui sapiente placeat cupiditate voluptatum. Autem non ut porro necessitatibus voluptas rerum reprehenderit blanditiis. Temporibus repellat reprehenderit autem vitae odit ut ipsa facere sunt. Ullam nisi hic temporibus rerum. Dolor beatae voluptates at quas quo soluta labore eos.\n\nCorrupti excepturi ut debitis ex aut voluptate non velit. Earum enim a. Aut ea aperiam debitis dolorem soluta deserunt saepe tempora consequatur. Impedit suscipit in velit quo porro autem qui eligendi eos.	Vertical	1201445	2310872	Entregue	3	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.114605+00	\N	\N
272	3	Complexo Bravie Costa	Non quia architecto quaerat et laboriosam. Rerum culpa sit. In rerum perferendis deleniti aperiam in deleniti accusantium nobis molestias. Voluptatem minima eligendi.\n\nExpedita fugit sunt cumque dolores odio blanditiis harum. Inventore minus sapiente. Architecto fuga omnis beatae. Temporibus voluptate voluptas quis voluptatum enim non aut error et. Ullam sed voluptas et sed.	Loteamento	153593	250921	06/2029	0	6	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114628+00	\N	\N
273	5	Edifício Garden Barros	Sed recusandae quis et quia ducimus sit. Voluptatem in quam. Voluptates numquam incidunt corporis repellat ut rem eaque dolor est. Error ipsam sed voluptas quis perferendis omnis qui.\n\nQui hic molestiae aut inventore ipsa. Ad odit delectus beatae sunt eligendi ut itaque eveniet et. Cum distinctio minima vitae sint impedit. Repellendus expedita repellat ad atque laborum. Explicabo dolor sit sunt enim ut labore molestias numquam. Reiciendis inventore maxime ea aliquam et et reiciendis esse consequatur.	Vertical	1119927	1472319	05/2029	1	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114646+00	\N	\N
274	10	Ville Bela Vista Santos	Libero rerum omnis. Fugiat aperiam voluptate doloremque fugiat quisquam aut non. Molestiae voluptatem ipsum voluptate error quo laboriosam dolorem. Vero quia rerum eveniet quam repellat dicta nisi eum. Ea ut consectetur est beatae aliquid aut.\n\nHic quos magni molestias aspernatur delectus possimus aut. Ut debitis nemo veritatis. Voluptate ut molestias rem odit corrupti architecto provident aut. Quia temporibus fugiat odio quis occaecati labore eligendi.	Vertical	763680	1477157	02/2028	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114671+00	\N	\N
275	2	Vila Prime Franco	Fugit in nesciunt magni ad quo tempora ex sapiente. Est quia harum id cupiditate ea similique assumenda. Molestias aliquam perspiciatis. Optio officia quae vero. Aspernatur perspiciatis facilis qui autem molestiae distinctio exercitationem maiores.\n\nQuos aut minus ut non. Tempore esse officiis quam praesentium facilis voluptatem laudantium. Et quo eum tenetur maxime fugiat totam. Et beatae consequatur quidem laudantium deleniti. Vitae vel non architecto ipsum quos.	Loteamento	277510	358592	12/2028	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114692+00	\N	\N
276	3	Residencial Lumina Santos	Enim quas labore sit. Dolorum atque provident inventore ut laudantium quod sunt ea. Qui voluptas qui accusamus aut velit. Rerum blanditiis est. Veritatis temporibus aut et quia a perferendis.\n\nSed sit aliquid minima laudantium natus adipisci earum. Minima ipsa corporis earum. Reprehenderit pariatur ad rerum natus praesentium. Sequi eos perspiciatis accusamus eaque repellendus. Porro tenetur quia illo. Et molestiae commodi sint numquam iure cumque laudantium.	Loteamento	117729	264656	Entregue	0	19	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114713+00	\N	\N
277	10	Edifício Vision Franco	Aut et ad autem. Commodi esse ea natus commodi dolore magni et. Praesentium voluptatem minima. Fugiat dolore nisi accusantium consequatur vel quod. Optio doloribus iste nihil.\n\nAdipisci maiores atque molestias voluptatum ut nostrum dolores. Harum voluptatibus eveniet at et dolorum. Laborum deserunt eius dolor quia maiores nulla quam. Aliquid non qui. Possimus eveniet itaque quisquam autem. Et deserunt ratione fugit voluptatem quis eos.	Loteamento	231997	374341	03/2027	0	16	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114735+00	\N	\N
278	2	Plaza do Sol Xavier	Consequatur fugit voluptatum ab illo. Voluptas quas ullam voluptas praesentium. Quaerat excepturi voluptatem reprehenderit. Ut debitis eum voluptatem velit optio dolorem. Impedit incidunt odit beatae soluta odit sed est sit quas. Qui quia et commodi rerum consequatur quia quam.\n\nNihil rerum deleniti quo est voluptatem sunt mollitia. Consequatur aliquid ipsum unde sed voluptas quisquam animi. Quod rerum dolor et.	Loteamento	222542	315266	01/2029	0	18	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114756+00	\N	\N
280	1	Torre Di Roma Costa	Consequatur omnis neque odio vero nam atque corrupti nostrum officiis. Qui nisi nisi voluptatibus consequatur mollitia. Cupiditate cupiditate est ducimus. Exercitationem et et ut non et suscipit debitis.\n\nOmnis fuga excepturi sint voluptatem tenetur deleniti alias in porro. Est itaque dolore iusto quia pariatur omnis eos est eos. Occaecati unde aliquid illo ullam praesentium sequi aperiam debitis architecto. Vel qui quia totam nisi.	Horizontal	969183	2203652	Pronto	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114793+00	\N	\N
281	7	Vila Premium Carvalho	Porro quia et sint iusto magnam. Quo quo aperiam aut impedit. Rerum officia error dolorem accusamus hic. Sint in nihil maxime eum facilis voluptatem.\n\nNostrum est quaerat saepe vel et dolor totam maxime culpa. Suscipit numquam accusamus et. Facilis sint ut error consequatur ab enim nihil.	Horizontal	1714245	3031638	Entregue	0	13	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114813+00	\N	\N
282	3	Condomínio Acqua Santos	Quaerat et eum nobis ab. Possimus molestiae eos. Dolores inventore reiciendis omnis mollitia optio quidem quasi. Inventore nesciunt excepturi non molestias sunt. Deserunt nesciunt ipsum in. Repudiandae error dignissimos aut enim culpa.\n\nSit architecto sapiente cum ut perferendis omnis nobis quia. Laboriosam eligendi sunt enim sunt voluptas explicabo eum. Non et ut est odio nesciunt nulla. Et vero autem laboriosam sunt facilis laborum perferendis quam. Nihil accusamus sed laborum non qui quidem. Et omnis quasi eligendi qui nam quo est alias.	Horizontal	609221	987120	Entregue	0	17	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.114828+00	\N	\N
283	1	Complexo Central Pereira	Aliquam velit voluptatum omnis incidunt laudantium. Voluptatem sit consectetur aut vel. Deleniti quas quia voluptatem rerum. Voluptatem porro eveniet dolorem praesentium quod. Iusto fuga ad est aut praesentium quis dolores harum eum.\n\nImpedit et corrupti tempore omnis fugit deserunt. Et consectetur et. Sit quis hic. Sint quod ut sunt consequatur.	Horizontal	1973727	3455414	Entregue	0	18	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114854+00	\N	\N
284	8	Edifício Natura Moreira	Eligendi doloremque minima ab ullam cupiditate. Nemo voluptatem deleniti dignissimos minus deleniti corporis dolore. Dolor repellendus qui consequuntur illo quia doloribus commodi mollitia. Iste repudiandae quod ut. Cupiditate molestiae exercitationem aut cum aut animi esse officiis ipsam. Occaecati ea et consequatur nam.\n\nNon quo qui repellat aliquid accusamus consequuntur et totam soluta. Sunt ut commodi laudantium ipsa. Officiis deserunt culpa quis eum. Deserunt neque qui quo ut iure.	Vertical	1404373	2571077	09/2026	3	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.114872+00	\N	\N
285	3	Jardim Oasis Nogueira	Omnis voluptas recusandae voluptatem omnis dolor est et. Commodi consequuntur dicta expedita sint sint eius optio optio dolore. Aut corrupti voluptatem nemo ut iure animi excepturi nobis. Et incidunt quia sit sequi cupiditate. At quaerat error eligendi repudiandae et quaerat aspernatur eum ut.\n\nVeritatis harum atque nostrum repudiandae aut ducimus sit quis voluptas. Impedit enim ea quis voluptas voluptatem. Culpa eius praesentium perspiciatis. Magnam est voluptatum assumenda suscipit corporis impedit debitis sunt. Magnam sed culpa dicta.	Loteamento	122185	304936	Pronto	0	14	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.114893+00	\N	\N
286	5	Spazio das Flores Batista	Ut voluptatibus veritatis rerum totam aut dolores itaque pariatur. Sint sapiente unde corrupti dolore. Dicta ad deserunt blanditiis enim. Et qui consectetur corrupti.\n\nEt voluptas aperiam perspiciatis molestiae et expedita soluta voluptatem. Voluptates placeat modi blanditiis. Fugiat libero accusantium quis nulla excepturi sit repellat perferendis. Mollitia amet optio minima et alias rem iste. Necessitatibus aut cupiditate consectetur dolores facere dolorem.	Loteamento	228302	318020	08/2027	0	7	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114918+00	\N	\N
287	11	Edifício Central Martins	Quis dicta minima eos accusantium voluptatem illo. Quia enim labore illo est autem deleniti velit cupiditate. Sed ut doloremque culpa voluptatem. Aut animi vitae inventore. Iusto iusto aut dicta. Aut consequatur velit labore sed alias provident dolorum vitae corporis.\n\nFuga repellendus autem non maiores. Voluptatem facere ut fugiat ipsam illo ullam aut ipsam beatae. Sunt voluptatem enim eaque iste dolorem sit omnis. Ut earum ut.	Horizontal	1221271	2305658	Pronto	0	20	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.114937+00	\N	\N
288	8	Maison Horizon Oliveira	Est sunt velit aperiam et odio. Eum aperiam velit eos. Aut facere beatae temporibus nobis qui ex sint quasi. Et unde temporibus voluptas est unde.\n\nEt fugiat quo consequatur dolorem ut minima porro quia. Aut iure ut adipisci alias quo repudiandae ut omnis. Id debitis rerum quam ab consequatur veritatis consequatur sapiente reiciendis. Dolores et optio rerum. Beatae alias cupiditate labore aut quis. Recusandae numquam fugiat eveniet eos voluptatem.	Loteamento	252004	343174	01/2028	0	2	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.114959+00	\N	\N
289	8	Torre Acqua Melo	Eaque culpa odit est aut. Fugit aperiam doloribus nisi. Aspernatur sit dolores sed qui eos quia possimus unde.\n\nDoloremque cupiditate repellendus et. Vitae sequi porro autem. Unde deserunt incidunt blanditiis alias eligendi voluptas beatae. Nulla fugiat et eaque ipsam aut cumque eligendi deleniti explicabo.	Horizontal	1949279	2820949	02/2028	0	15	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.114981+00	\N	\N
290	4	Ville Oasis Nogueira	Ullam reiciendis asperiores ut cupiditate cumque non non. Eos laudantium nisi delectus numquam blanditiis architecto pariatur repellat. Ut eveniet dolor. Laboriosam alias nesciunt ut atque adipisci et voluptatem cumque. Rem quisquam nisi accusantium suscipit nemo. Qui soluta et laboriosam.\n\nPossimus quia fuga aspernatur veniam molestiae omnis. Iure provident incidunt quos perspiciatis. Suscipit ratione ullam. Provident omnis accusamus temporibus iusto sequi est minus.	Vertical	593141	1102297	08/2028	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.114997+00	\N	\N
291	2	Maison Garden Carvalho	Aut perspiciatis officia harum dolorem quia porro iusto quia velit. Minima ex tempora et aut corporis modi consequatur soluta fugiat. Expedita et distinctio veritatis odit a et omnis. Nobis et consequatur est est autem et ut et at. Natus dolore id. Et doloribus voluptatum dolor consequatur ut fuga.\n\nDelectus laudantium enim cupiditate aut quia non delectus molestiae. Recusandae ab quis hic soluta aut itaque alias. Suscipit eum iusto sunt et et et odit. Et sint perspiciatis minima unde et porro consequuntur. Sunt nihil fuga. Quod quis perferendis voluptas architecto quam.	Loteamento	208454	369663	03/2027	0	13	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115017+00	\N	\N
292	10	Condomínio Paradiso Melo	Molestias id mollitia. Porro nulla et veniam. Hic ut ut corrupti inventore possimus. Omnis libero velit asperiores tempore.\n\nIusto commodi consequuntur. Enim nam id quia est non quisquam. Autem cumque ut labore. Placeat facilis sint nulla dolore nihil et ex fugiat repellendus. Assumenda vero nemo enim non adipisci labore autem vel quibusdam. Et neque fugit dolor in.	Vertical	1009618	1413855	11/2026	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115045+00	\N	\N
293	11	Jardim Real Barros	Natus autem enim ipsam nobis reprehenderit adipisci. Omnis ab error magni eum asperiores ut. Odio omnis voluptatem distinctio. Rerum neque a cupiditate doloremque reiciendis deserunt.\n\nVoluptatem et temporibus adipisci aut illum voluptatum veritatis. Autem temporibus sed sunt perferendis natus maxime. Dolorem ad provident beatae.	Vertical	540750	1368256	01/2028	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115066+00	\N	\N
294	2	Maison Unique Oliveira	Quidem odit porro in. Sequi sint ut ullam iure laborum. Fuga recusandae iste omnis aut recusandae aspernatur. Similique et in amet enim.\n\nQuam nobis mollitia voluptate incidunt aliquam. Hic et minima sed similique illo voluptate ex cupiditate maiores. Vitae nostrum voluptatem nihil qui.	Vertical	389025	2169654	05/2029	1	0	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.115081+00	\N	\N
295	3	Vila Central Moraes	Velit provident rerum aut ut. Nihil vel illo voluptatem. Sequi amet nihil eum accusamus consequatur vel voluptatem. Debitis non reiciendis deserunt atque et excepturi molestias doloribus. Deleniti velit omnis quam sit. Rerum et molestiae amet atque maiores cupiditate.\n\nDebitis suscipit ut doloremque quo ex similique nam dolores. Pariatur dolores ipsa dolorem aliquid. Accusantium ut quia corrupti voluptatem velit fugiat et repellendus dolores. Suscipit enim quas eius illum aliquam. Maxime fugiat ducimus illum. Error officiis et non reprehenderit corporis.	Loteamento	158827	243835	Entregue	0	16	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115096+00	\N	\N
296	7	Complexo do Sol Souza	Sit sed enim est aliquid saepe et. Enim aliquid velit itaque saepe omnis quod ea est. Ut eos iure non ut repellat. Accusantium eaque dolorem et quisquam.\n\nEt quia rerum minus debitis dolor sit non. Voluptas rerum quae iste et cupiditate aut tenetur eum. Enim fuga hic adipisci vitae rerum explicabo omnis.	Loteamento	252044	403113	Entregue	0	19	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.115121+00	\N	\N
297	9	Jardim Borges Braga	Dicta placeat ut dolore ab. Ex inventore eos quo dolores est. Ratione optio voluptatem pariatur fuga ipsa voluptatem cum impedit. Iste ipsam similique eligendi placeat labore quia rerum eaque culpa. Facilis voluptatem rerum porro at aut omnis voluptate est.\n\nRepellat perferendis velit eum id sint omnis doloribus in. Sit excepturi rerum ut. Ut quis esse qui. Omnis perspiciatis consequatur iusto et odit est qui eius. Harum quo voluptas.	Loteamento	252214	362356	04/2028	0	6	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115138+00	\N	\N
298	3	Torre Central Silva	Consequuntur modi culpa atque provident mollitia. Corporis atque aliquid id delectus. Rerum et ut voluptas debitis rerum quis harum dolor. Asperiores quas id enim qui quia tempore deleniti est temporibus. Commodi distinctio assumenda.\n\nMinima sunt voluptas sapiente. Dolor officiis corporis hic numquam nobis blanditiis. Eius odit laborum perferendis eos suscipit in omnis facere. Pariatur dignissimos numquam voluptate atque aut.	Vertical	1321228	3078836	Pronto	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11519+00	\N	\N
299	5	Parque Borges Oliveira	Reiciendis quis quasi omnis necessitatibus porro ipsa autem laborum. Perferendis quia unde. Placeat cum odio. Vel ad tempore dolorum voluptas est itaque. Eum perspiciatis quibusdam. Blanditiis perspiciatis rerum nesciunt dolorem.\n\nFacere veniam eaque distinctio corrupti eos nisi dolorum saepe. Molestias vero voluptatibus ut nisi quos explicabo aspernatur. Dolorem et aut. Vero molestiae rerum sapiente. Praesentium tenetur quisquam repellat nam est est sapiente nemo. Quisquam quidem inventore.	Loteamento	116378	260900	04/2029	0	14	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115228+00	\N	\N
300	11	Edifício Real Carvalho	Voluptas qui ut sequi eligendi facere sed. Vel deleniti voluptatibus ut expedita laboriosam enim. Sint maxime sit eius inventore quasi alias. Deleniti rerum consequuntur laboriosam corporis aut sint. Odit maiores voluptas est.\n\nIpsa dolor distinctio commodi possimus. Ut veritatis ea ipsa. Asperiores quos quibusdam ipsam sit. Cumque dignissimos et praesentium ab deserunt sed.	Loteamento	174736	231272	Pronto	0	3	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115251+00	\N	\N
301	5	Ville Real Costa	Est quibusdam nisi dignissimos. Saepe et sequi est aspernatur velit iusto. Dolorem doloremque doloremque sit nobis aperiam dolore. Ducimus modi doloremque repellendus. Earum et natus et esse nesciunt illum et. Soluta iusto consequatur quia.\n\nQuia perspiciatis nihil autem illo facilis asperiores. Omnis qui quia consectetur praesentium. Animi est incidunt debitis eveniet modi. Qui similique voluptatem aut.	Vertical	517479	1782787	Entregue	4	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115269+00	\N	\N
302	2	Torre Bravie Moraes	Nulla aperiam praesentium. Laudantium cum quis praesentium nostrum provident enim perferendis. Vel fuga iure eius qui omnis voluptatem. Ipsum sit itaque doloremque possimus quasi quis ducimus exercitationem natus. Rerum illo aut ut itaque asperiores eius velit qui. Aspernatur quam enim.\n\nHarum sed iusto dicta quia cum totam. Doloribus ut minima qui impedit. Aspernatur ad voluptatem eaque.	Horizontal	933392	1898716	Entregue	0	15	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.115288+00	\N	\N
303	5	Torre Borges Santos	Animi quisquam dignissimos consectetur quos ullam. Libero voluptas ut. Esse aut molestiae in voluptate deserunt.\n\nId qui aut odio quia doloribus cupiditate qui totam modi. Ut esse non. Reprehenderit aperiam cumque deserunt delectus dolorum quod sunt ipsa.	Vertical	774797	1961275	09/2026	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115307+00	\N	\N
304	3	Condomínio Acqua Saraiva	Rerum hic soluta et quidem maxime. Voluptatem sunt deserunt. Molestiae et aut et nihil. Id autem non quos dolor distinctio reprehenderit nesciunt. Veniam consequatur mollitia et qui minus rerum. Iure sed odit et libero est suscipit fuga.\n\nAdipisci quam quia aperiam. Deleniti nesciunt quos esse nihil ad quidem mollitia praesentium id. Quasi consequatur autem et commodi hic. Optio quia omnis repudiandae. Voluptatum quisquam rerum sunt saepe ut. Animi in necessitatibus voluptatem nobis.	Horizontal	1670229	3129938	Entregue	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11532+00	\N	\N
305	10	Maison Horizon Moreira	Sit nesciunt accusamus sit. Ex perferendis ducimus aut. Veniam nulla sunt sed. Repudiandae ad aut.\n\nRatione sapiente id ea tenetur. Est natus nemo autem. Vero labore nemo et quas minus aut. Vero aut qui ipsum.	Loteamento	215015	397974	02/2027	0	7	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.115344+00	\N	\N
306	8	Ville Lumina Franco	Autem ut quae et quae unde minima et ducimus culpa. Voluptatem aut in minima id omnis rerum aut iusto. Quos aperiam tempora pariatur quos modi delectus labore totam unde.\n\nNesciunt fuga nostrum exercitationem dolores similique debitis et nesciunt facere. Omnis molestiae et itaque. Dolorem nisi aut nam quos excepturi. Reiciendis ut cupiditate ratione vel id. Laboriosam ullam est omnis porro. Qui et commodi cumque sed autem consequuntur voluptatem fuga ex.	Vertical	669279	1461510	Entregue	4	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115357+00	\N	\N
307	8	Torre Bravie Melo	Ut maiores voluptas placeat et qui accusantium beatae voluptas dicta. Sed quasi voluptatem asperiores minus earum. Odio eum voluptatum nemo impedit soluta minus.\n\nRecusandae nihil dolorum nobis ut consectetur repudiandae. Et tenetur sunt pariatur libero tenetur est nam in. Perferendis et dolores commodi minima. Harum mollitia vero officia nisi reiciendis qui est eveniet est. Nesciunt enim eveniet ut velit ut ut harum.	Horizontal	878437	1937726	04/2029	0	9	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115379+00	\N	\N
308	9	Vila Lumina Santos	Nemo perspiciatis sed est deleniti aut perspiciatis earum officiis. Cumque aut voluptas laudantium enim beatae eveniet sit omnis. Quia consequatur sit ab.\n\nQuas aperiam iure vel a quas consectetur dolor. Molestiae quisquam et voluptates consequatur. Sed voluptas voluptatem quia optio numquam at. Et qui iusto cumque voluptas veniam. Omnis et nam nam molestiae ex asperiores odio inventore.	Vertical	1139628	1304845	08/2028	2	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115398+00	\N	\N
309	10	Spazio Exclusive Macedo	Rerum ut placeat tempore suscipit quia quidem autem id. Sit totam voluptates fuga numquam architecto excepturi temporibus non. Et qui ab omnis quam atque modi corporis consequuntur et.\n\nCommodi a itaque voluptas saepe ex voluptas dolorem sapiente. Numquam et eveniet dolor quibusdam. Labore quia ducimus illo. Sed excepturi optio est eum odio sint molestiae rerum qui. Quia est autem qui voluptas odit est. Ratione omnis necessitatibus voluptatibus voluptatibus laborum alias voluptatem temporibus esse.	Loteamento	128421	310751	Entregue	0	2	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.115417+00	\N	\N
310	4	Jardim Acqua Silva	Ut velit maxime velit a sunt eveniet. Dolore accusantium dignissimos dolores nisi. Qui hic nobis reiciendis excepturi sunt eaque.\n\nNeque error et quia occaecati cupiditate. Possimus inventore qui quae non nulla possimus omnis. Ut possimus vitae aliquam porro et impedit dolore architecto eaque. Itaque ducimus neque non ut nulla eius eius sint. Quia consequatur odit. Sint labore dolorum commodi assumenda illum in.	Vertical	1278412	2313912	03/2029	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115441+00	\N	\N
311	6	Maison Paradiso Moraes	Tempora autem exercitationem. Dolorum consequatur inventore accusantium non sit. Aut asperiores nisi neque tenetur ipsa. Harum sunt doloremque beatae quibusdam iure labore odit incidunt. Ducimus impedit tempora vitae rerum laboriosam.\n\nDolor qui voluptatum. Nihil et et fugiat ex quia accusamus. Et est quo ipsum. Reprehenderit impedit expedita ex placeat repellat. Beatae voluptatibus minus tempora dicta et ut autem. Qui dicta omnis cumque.	Horizontal	1953359	2307411	03/2028	0	11	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.11547+00	\N	\N
312	7	Jardim Central Carvalho	Animi voluptatem eum excepturi sit nemo quisquam porro accusantium magni. Minima accusantium provident voluptatem incidunt illo est cupiditate. Qui nulla voluptas et hic dolor. Voluptatem rerum velit alias non voluptatem consequatur. Debitis in beatae repellat voluptatem veritatis illo sit. Et adipisci animi dolores delectus molestias velit totam quidem.\n\nProvident tempore et quaerat consequatur. Ducimus optio aliquid veniam fugiat sit quos saepe voluptatibus sequi. Et delectus nobis aspernatur.	Horizontal	1270913	2538588	Pronto	0	19	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.115503+00	\N	\N
313	6	Condomínio Unique Reis	Laboriosam eligendi qui optio beatae est in qui occaecati quam. Doloribus rerum veritatis aspernatur. Optio id ut alias. Voluptatem placeat saepe sed eligendi minus quia repudiandae illum ut. Aut deserunt repellat eligendi dolores sapiente qui asperiores. Excepturi nisi qui nobis consequatur asperiores odio.\n\nSit sunt optio. Nihil maxime aut dolor minima. Autem corrupti id praesentium sit veritatis aut ab exercitationem. Quia expedita quo voluptas animi consequatur. Eveniet corrupti quisquam quia excepturi. Doloremque et odio qui enim ea dolorum.	Loteamento	291822	488373	04/2028	0	10	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115537+00	\N	\N
314	5	Residencial Borges Santos	Et et ipsam distinctio dolorum. Animi consequatur est quos praesentium et cum corrupti vitae. Illo suscipit voluptate id nisi delectus assumenda eaque ducimus. Autem iusto fugiat.\n\nEnim ipsum et vitae non eius doloremque. Accusamus nulla molestiae voluptatem magni ex eum consequuntur quos. Quas doloremque delectus. Et omnis ut unde numquam incidunt qui omnis qui harum. Itaque voluptas doloribus et amet animi natus ut. Ut eos placeat aut.	Vertical	408462	2105018	Pronto	3	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115581+00	\N	\N
315	10	Parque do Sol Pereira	Laudantium cum laboriosam blanditiis atque ea. Eius beatae ratione magnam laboriosam. Sit non id. Non facilis sunt. Quia architecto facilis qui molestiae ipsum a. Repellendus saepe est atque explicabo aut reprehenderit totam facilis.\n\nLaborum molestias eum voluptas non. Itaque iusto est. Officia blanditiis vel numquam non quis commodi et. Et dolores omnis adipisci exercitationem molestias et praesentium. Quis qui nesciunt molestias officiis consequatur dolorem. Explicabo fuga consequatur eius voluptas neque sunt et.	Vertical	943927	1888626	Entregue	5	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115615+00	\N	\N
316	7	Jardim Exclusive Barros	Rerum est et et voluptatem. A ipsum culpa esse quam dolor qui ipsum. Sunt incidunt sit id ipsam hic aliquid corporis sunt. Voluptas quis et expedita ratione et voluptates maiores saepe.\n\nDolor voluptatibus facilis suscipit. Sit quia enim quo. Nisi ut alias in accusamus minus enim.	Loteamento	272948	413640	11/2026	0	7	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11564+00	\N	\N
317	4	Residencial Premium Silva	Nulla qui eum velit amet dicta. Est nihil hic ab dolor ratione. Possimus quo dolorum odio ut.\n\nBeatae quaerat atque. Dolorum aut non ex laboriosam adipisci voluptates sapiente nobis vel. Consequatur quidem nihil. Inventore dolorem vel minima beatae qui. Sunt dolor ullam quo sint voluptatem.	Vertical	788293	951425	04/2028	1	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115657+00	\N	\N
318	10	Jardim Prime Martins	Eaque qui libero. Asperiores iste voluptates eos alias. Saepe reiciendis ex ducimus omnis est. Sunt doloremque sunt quas assumenda suscipit non.\n\nEos aut libero et cupiditate delectus quasi corporis. Dolor sed tenetur qui vero quas rerum voluptatem vel. Rerum nisi esse doloremque dolores consequuntur velit architecto error error. Optio nostrum repellat possimus quo a sed. Aut qui qui officiis voluptas rerum ipsa ratione ab.	Vertical	431651	1056729	Pronto	5	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115673+00	\N	\N
319	10	Parque Vision Xavier	Natus id exercitationem quia sapiente voluptatem voluptas esse. Ratione soluta excepturi ut qui voluptatem. Placeat qui et facere pariatur sint ut ut. Optio et praesentium veniam enim sunt earum magnam.\n\nQuo aut exercitationem neque animi dolor eum optio minus aut. Voluptatem soluta perferendis. Dolore et rem. Eum voluptates ducimus debitis fugit aut non. Deserunt consequuntur hic possimus a ut harum et.	Vertical	400649	1844813	04/2029	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115694+00	\N	\N
320	2	Torre Borges Costa	Saepe id iusto rerum esse et minus quia eum. Omnis sunt eos eum error blanditiis voluptas id. Cumque consequatur dicta quos voluptas consequuntur consequatur aliquid enim qui. Ipsum optio delectus.\n\nCommodi eveniet magni eum nihil dolorum maxime accusamus aut mollitia. Eum sed quod enim soluta quisquam molestiae eaque. Eum deleniti earum voluptate laborum ut velit soluta at voluptas. Nihil vel sint. Rerum quo modi nemo dolor iste.	Vertical	841754	1056945	Entregue	4	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.115716+00	\N	\N
321	10	Ville Bravie Santos	Facilis tempora in perspiciatis. In consectetur nostrum non voluptatum qui reiciendis omnis ea. Non non unde ad aut vero ut. Eligendi beatae non rerum qui consequuntur dolores et. Odio aut ea facilis blanditiis et. Sapiente et perspiciatis iusto voluptas magni delectus voluptas fugiat repellendus.\n\nVoluptas ut nobis dolor quibusdam ad corporis quas et animi. Dolores sit veniam vitae omnis. Nobis dolorum quia aut inventore qui. Labore enim nesciunt natus est facilis adipisci. Fuga possimus harum enim aspernatur atque. Distinctio corrupti reprehenderit aut quis soluta officia itaque.	Loteamento	130832	229396	04/2028	0	13	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115753+00	\N	\N
322	6	Ville Borges Nogueira	Sunt accusantium sed. Officia placeat eum doloremque et dolore. Perferendis delectus incidunt quia mollitia est cum non.\n\nDolores porro quis earum. Repellendus itaque amet. Non cumque animi quisquam impedit optio. Earum rerum fugit omnis facilis est tempora. Ullam perspiciatis et debitis. Tempora labore repudiandae fuga placeat omnis eum et qui tempore.	Vertical	414313	1248838	08/2026	2	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115802+00	\N	\N
323	6	Maison Exclusive Barros	Occaecati aliquid labore aut ipsam id qui. Et et cum odit eveniet cumque soluta. Eaque consequuntur enim eius.\n\nPorro sunt aperiam assumenda. Inventore accusamus doloremque aut sed quae tempore. A rerum et officiis quia qui ab. Laudantium totam incidunt hic tempore dignissimos. Eos vitae ut cumque officia nihil incidunt et saepe porro.	Horizontal	1904085	3184295	Entregue	0	14	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115834+00	\N	\N
324	9	Edifício Natura Santos	Maxime ipsum quis sunt nihil aliquid alias. Et autem velit eius ut. Recusandae ut voluptates quae sit dolor.\n\nQuo ut ad eos quo tempora facilis. Distinctio error quibusdam eum molestias. Deleniti id ipsam a repudiandae atque natus qui. Soluta voluptates vero aut rerum.	Horizontal	1048099	1763714	03/2028	0	14	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115854+00	\N	\N
325	7	Ville Lumina Franco	Quasi sunt facere excepturi ratione et blanditiis labore exercitationem. Et perspiciatis sint voluptatibus occaecati non aspernatur est. Doloremque aut alias. Voluptatem aliquid harum repudiandae exercitationem cum ab aperiam et ullam. Facere est voluptatibus labore pariatur aut ad recusandae voluptatem consectetur.\n\nEarum quia alias ipsam officiis architecto. Aut dicta ad voluptas commodi velit soluta similique. Consectetur dolorum voluptatem deserunt ratione omnis blanditiis vel recusandae distinctio. Laudantium vitae porro adipisci.	Loteamento	139464	236673	Entregue	0	13	\N	\N	Em Análise	t	\N	2026-07-20 13:49:41.115869+00	\N	\N
326	5	Edifício Paradiso Costa	Velit deserunt voluptatibus itaque officiis. Deleniti dignissimos assumenda amet. Ducimus placeat quibusdam et omnis velit quibusdam molestiae sunt corporis. Nihil cum reiciendis dolores fuga. Voluptatum expedita exercitationem et omnis. Sit ex nostrum tenetur natus.\n\nEt minus delectus eos earum quasi in eaque voluptatibus tenetur. Praesentium ut esse voluptatem magni. Iure veniam iusto non reprehenderit neque esse voluptates. Laudantium praesentium minus error quos et nam.	Loteamento	263999	323693	Pronto	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115891+00	\N	\N
327	7	Ville Lagos Moreira	Aut eveniet doloribus aut nobis quia ducimus illo fugiat est. Cupiditate est rerum vel temporibus tempora quisquam id ut. Aut voluptates aut praesentium qui sunt aut optio quis. Corporis omnis aut expedita. Iusto rerum iure fuga perferendis. Porro repellat hic quaerat quia molestias ex dolores distinctio.\n\nMinima debitis quia at iure cupiditate. Excepturi error possimus corporis accusamus rerum. Vel quis dicta praesentium. Minus qui animi dolor saepe ab eius animi et fuga. Qui hic occaecati ratione. Perferendis alias hic quos nemo nisi maiores consectetur impedit.	Horizontal	1810300	2378662	12/2026	0	2	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115912+00	\N	\N
328	10	Jardim Bravie Braga	Esse labore quo dolorem placeat ab nobis perferendis. Magnam id et sit qui veniam rerum cupiditate. Officiis quia labore fugiat et. Dignissimos deleniti itaque ut provident.\n\nRerum repellendus repellat voluptatem rem itaque. Soluta doloremque quibusdam ipsa culpa vitae nam ut architecto. Quia corporis quaerat quis provident rerum numquam impedit adipisci. Dolor doloribus consequatur. Minus quas aut ut temporibus mollitia.	Vertical	1255592	1786713	09/2027	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.11594+00	\N	\N
329	2	Condomínio Garden Macedo	Ipsum dolores exercitationem eos neque. Autem ipsum perferendis et consequuntur voluptatibus et eum. Inventore eum excepturi. Quo reprehenderit quia aut. Saepe unde veniam. Id atque id qui ea debitis maxime est consequatur.\n\nRerum optio fugiat. Dolorem unde recusandae sit quia maxime. Deleniti similique enim sunt blanditiis esse eius rerum. Ad officiis qui impedit.	Loteamento	183664	279734	09/2028	0	13	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.11596+00	\N	\N
330	11	Vila Bravie Batista	Ut consequatur id veniam reprehenderit pariatur necessitatibus dolor excepturi sed. Cumque blanditiis delectus dolorem ut cumque. Quas incidunt culpa minima dicta eveniet. Iure est consectetur rerum optio dolorum quibusdam cupiditate porro modi.\n\nIste aperiam ipsum qui debitis. Aperiam animi iure dolores at enim sunt. Quos et ut facere magnam ea quia iure cum.	Loteamento	190948	379407	11/2027	0	12	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.115978+00	\N	\N
331	3	Jardim Bela Vista Melo	Perspiciatis sunt et eveniet. Dolorem impedit rerum exercitationem nostrum reiciendis est natus at commodi. Laborum aut excepturi expedita excepturi est numquam molestias quam animi. Magni inventore est distinctio autem similique. Est sed quaerat.\n\nOdio ratione unde laboriosam eligendi quia pariatur. Aperiam sequi et vel ratione debitis magnam est unde. Occaecati atque ut autem. Aliquid atque quidem incidunt perspiciatis eaque saepe esse. Maxime ut incidunt velit. Necessitatibus aut sit id aut voluptate ut saepe velit velit.	Vertical	1428150	2496096	02/2027	3	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.115996+00	\N	\N
332	8	Edifício Lagos Reis	Ipsum consequatur voluptas sunt fugit blanditiis. Velit quis asperiores qui. Nobis ut praesentium quidem omnis enim quam ipsa. Reiciendis odio cumque at vel sed eligendi labore vel distinctio.\n\nEveniet eos suscipit sit. Voluptate veniam animi pariatur accusamus. Consectetur non et nobis iure autem ex temporibus rerum reprehenderit.	Loteamento	178158	244247	Pronto	0	12	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.11602+00	\N	\N
333	4	Complexo Oasis Saraiva	At non ex nam consequuntur voluptates ipsam ullam. Repellendus doloribus deserunt. Molestiae magni ipsa quas ipsum deleniti aut quia sint delectus. Vel eaque incidunt consequatur. Dolorem sed rem saepe qui impedit inventore veritatis corporis.\n\nIure velit nulla cupiditate suscipit similique deleniti reprehenderit excepturi maiores. Optio suscipit autem vel unde. Dolores maxime asperiores aut laudantium odit placeat nihil ducimus. Perspiciatis repellat velit libero veritatis et accusantium. Veniam temporibus reiciendis sit. Qui aut quisquam et laboriosam consequatur voluptates consequatur voluptatem.	Horizontal	1356195	1734978	02/2027	0	7	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.116036+00	\N	\N
334	11	Plaza Oasis Costa	Consequatur ipsum quia quo in sit doloribus id et. In numquam facere consequatur et autem omnis qui. Ullam totam omnis maxime quibusdam. Ipsa id et ad mollitia. Perferendis et quasi sunt expedita quasi eveniet. Harum nam ipsum adipisci voluptate rerum.\n\nEaque non suscipit explicabo tempora. Officia vero maiores quia saepe non alias aut. Quos rerum incidunt exercitationem voluptatem et quisquam. Iusto sed voluptates officia natus et.	Vertical	1238023	1503465	Pronto	2	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.116061+00	\N	\N
335	3	Vila do Sol Pereira	Ducimus doloribus temporibus suscipit velit nisi autem. Quae eum omnis aut. Laudantium ea alias illo omnis temporibus. Numquam totam dolorem perferendis et qui ab.\n\nVel sed sint ex voluptatem laboriosam voluptates laborum iusto. Aliquam qui atque qui veniam magnam. Vero commodi quisquam ea saepe omnis quae sed et illo.	Loteamento	145910	202928	02/2029	0	20	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116083+00	\N	\N
336	4	Plaza Imperial Carvalho	Eum corporis quam. Repellat molestiae dolore itaque sapiente repudiandae molestiae. Aut nobis a autem ratione. Aut ipsum praesentium qui ipsam doloremque officiis sunt.\n\nMolestiae id et id et. Et deserunt iusto. Mollitia officia et dolorem quam placeat. Laborum aut at corrupti nisi sed doloribus illum. Reprehenderit autem iusto dicta necessitatibus laborum rerum.	Vertical	1439899	2509452	Entregue	4	0	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.1161+00	\N	\N
337	4	Residencial Bravie Barros	Iusto perspiciatis et perferendis et est praesentium animi repellendus. Et praesentium qui voluptatem. Dolore aut quis itaque dicta.\n\nNihil fugiat sit quia necessitatibus. Illum aut suscipit aut voluptatem mollitia. Sunt nemo ipsa. Eaque mollitia qui omnis illum itaque dicta quam. Perspiciatis nam id labore nesciunt ducimus molestias. Minima ut aut deleniti minus.	Vertical	670392	929232	06/2027	1	0	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.116119+00	\N	\N
338	10	Parque do Sol Costa	Odio autem sed ut voluptas velit rerum accusamus ipsa architecto. Soluta voluptatem autem iure esse culpa illum sunt dolore et. Accusamus unde dolorem beatae non.\n\nDoloremque quas nemo ad sint possimus. Et quod in expedita et ut nihil dolore. Repudiandae ut doloremque neque libero placeat voluptatum ut aliquam. Sed cupiditate illo velit odio.	Vertical	805687	2161502	Entregue	3	0	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.116136+00	\N	\N
339	9	Condomínio Bravie Oliveira	Neque autem fuga odio nam magnam alias aut quia et. Quasi quia eum reiciendis voluptas autem rerum illum voluptatem dolor. Tenetur enim error labore magnam dolor voluptatem aut molestiae. Minus voluptatem veniam blanditiis sit at rerum aperiam. Ipsa occaecati ut optio aut.\n\nVoluptatem dolor soluta voluptates qui mollitia. Enim voluptate libero quae voluptatem et voluptatem autem atque quam. Excepturi minima qui quia voluptas ut rem quos. Sapiente consequatur quis fugit reprehenderit voluptate vero sunt. Quo sit aut atque.	Vertical	330411	2267263	11/2026	2	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116154+00	\N	\N
340	5	Condomínio Imperial Pereira	Enim optio magni laborum illo pariatur et repellat. Nihil quae hic rerum accusamus tenetur. Pariatur provident autem necessitatibus tenetur aut laudantium neque fuga accusamus. Doloribus voluptatem alias molestiae et aut. Tenetur quia odit in pariatur.\n\nSint animi tempore suscipit ea aut cumque adipisci quia perferendis. Odit nostrum libero tempore consequatur quis. Omnis labore voluptatem corporis voluptatum blanditiis. Dolorum amet sunt commodi accusantium autem occaecati cum omnis ipsum.	Loteamento	129770	229405	Pronto	0	10	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.116178+00	\N	\N
341	10	Condomínio Unique Carvalho	Voluptatem quo aut dolorum aperiam amet tempora quis rerum. Tempore ut sed culpa voluptas aut ut rerum. Consequuntur et quae.\n\nQui quia voluptates ut non in optio fugiat nihil et. Culpa ipsa odio beatae placeat enim id quam. Labore eum enim autem eius hic non cupiditate. Sunt quod et natus iusto. Eos et aut odio fuga consequatur similique.	Loteamento	140132	266605	Pronto	0	9	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116199+00	\N	\N
342	11	Jardim Bravie Moreira	Et aut nisi quis occaecati necessitatibus enim deserunt sed consequuntur. Consequuntur in enim exercitationem aut et. Ipsam aperiam inventore perspiciatis aut a soluta autem.\n\nProvident fuga quas itaque dolores. Libero laboriosam quos hic beatae doloremque. Totam saepe architecto dolorum et nisi et qui.	Horizontal	1545251	2706984	10/2027	0	9	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.116218+00	\N	\N
343	9	Spazio Natura Carvalho	Fuga quae consequuntur dicta incidunt ex sed et laboriosam. Impedit commodi in saepe sit id velit. Quaerat eum est velit non. Aut dolores sunt labore possimus quasi nesciunt quaerat aliquid. Sed voluptas repudiandae modi voluptas tenetur nisi repellendus assumenda. Dignissimos molestiae eaque hic et.\n\nAnimi voluptas est voluptatem fugit est omnis. Quo expedita quibusdam consequatur dicta eligendi quidem accusantium. Occaecati sequi delectus ut id harum molestiae. In accusamus eos dolores voluptatem eos. Deleniti molestias saepe illum ut et quo adipisci.	Vertical	928266	1623402	Entregue	1	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.116232+00	\N	\N
344	1	Ville Exclusive Pereira	Inventore veritatis ipsum velit. Reiciendis numquam excepturi sint beatae sapiente. Qui dolorem sit quia voluptatibus.\n\nSit dolorem porro ut et dolorem quo at. Voluptatem id quod ut explicabo est itaque iusto. Molestiae quas voluptas saepe est sed dolor reiciendis. Aut eos vitae omnis aut mollitia quo earum est.	Loteamento	164831	225045	01/2028	0	20	\N	\N	Em Análise	f	\N	2026-07-20 13:49:41.116258+00	\N	\N
345	2	Torre Lagos Albuquerque	Ab voluptas odio numquam. Ipsum mollitia explicabo accusamus eveniet quibusdam. Corporis cupiditate est. Ea explicabo ex quaerat. Ut voluptatem et neque quas ut doloribus sit.\n\nEst laboriosam est nobis culpa sunt et quaerat. Magni non nihil sed corrupti culpa placeat non. Quasi facilis quia consequuntur dolorum molestiae. Consequatur quia ratione sit perspiciatis distinctio occaecati voluptate voluptas.	Horizontal	1143070	1421963	08/2028	0	19	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116274+00	\N	\N
346	11	Vila Real Oliveira	Exercitationem sapiente quod culpa temporibus. Debitis ut nostrum. Officia cumque odit suscipit animi. Aut ullam ex deleniti sit accusamus. Optio deleniti quisquam natus hic incidunt.\n\nAssumenda ipsam sit nesciunt dicta placeat dicta est. Cupiditate dolorem aliquid tempora ut est. Quo voluptate consectetur voluptatibus labore consequuntur neque. Voluptatum magnam est id rem.	Vertical	570198	1973796	Entregue	1	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116293+00	\N	\N
347	1	Edifício Bravie Macedo	Atque sunt id pariatur est animi dolores. Quam vel cupiditate sed totam accusantium dolores odit fugit illum. Ipsum quod veritatis ut consequatur nobis ipsam aliquam delectus perspiciatis. Ut esse est incidunt ullam maxime excepturi quaerat culpa. Assumenda qui nemo dolor beatae quia aut voluptatem non quam.\n\nAperiam minus ea nostrum reiciendis a reprehenderit vitae. Quisquam at esse. Dolor et inventore ad alias voluptatem. Provident accusamus omnis. Sequi optio perferendis odit et amet harum et.	Vertical	1166627	1272576	03/2029	5	0	\N	\N	Bloqueado	t	\N	2026-07-20 13:49:41.116334+00	\N	\N
348	10	Condomínio Lumina Reis	Debitis voluptates inventore iste eaque fuga sed occaecati incidunt. Rerum voluptatem quidem vel quibusdam unde et molestias tenetur modi. Corrupti harum cumque blanditiis natus.\n\nQuaerat debitis eveniet sunt illo magni dolorum. Quam ratione ut commodi totam nihil suscipit recusandae enim eum. Velit sed deleniti aperiam neque.	Horizontal	610539	1063505	07/2029	0	11	\N	\N	Bloqueado	f	\N	2026-07-20 13:49:41.11636+00	\N	\N
349	11	Complexo Prime Nogueira	Ducimus et consequatur ut qui voluptate non consequatur cumque occaecati. Adipisci suscipit quam iste alias. Deleniti tempore inventore atque ipsa perspiciatis omnis.\n\nDebitis asperiores rerum et quia est repellendus qui explicabo qui. Maiores id consequatur repudiandae occaecati non velit sed eum. Dolor non cumque exercitationem quis magni. Nulla ipsam sunt. Minus iusto consequuntur dolorem qui hic eos est.	Loteamento	285870	392001	Entregue	0	11	\N	\N	Liberado	f	\N	2026-07-20 13:49:41.116375+00	\N	\N
350	1	Residencial Lagos Franco	Ipsam iusto enim totam nostrum placeat quia occaecati autem. Assumenda aliquid facere laboriosam voluptas ullam ut non. Fugit iste dolor sunt. Autem dolor tempora et dolor dignissimos necessitatibus ea voluptatum rem. Velit quo quas itaque vero voluptate ut ut et blanditiis.\n\nAut sit libero sunt commodi vel. In illo cupiditate accusantium quibusdam corporis omnis sit sequi. Praesentium sit maxime vero exercitationem aliquam voluptas et.	Vertical	1173744	1392386	09/2028	3	0	\N	\N	Liberado	t	\N	2026-07-20 13:49:41.116394+00	\N	\N
\.


--
-- Data for Name: enderecos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enderecos (id, construtora_id, estado_id, cidade_id, bairro_id, cep, logradouro, complemento, numero, latitude, longitude, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados (id, uf, nome, created_at, updated_at, deleted_at) FROM stdin;
1	MT	Mato Grosso	2026-07-20 13:49:40.689662+00	\N	\N
\.


--
-- Data for Name: fotos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fotos (id, construtora_id, empreendimento_id, planta_id, nome, descricao, arquivo, extensao, tipo, status, created_at, updated_at, deleted_at, destaque_principal, destaque_carrossel, destaque_planta) FROM stdin;
\.


--
-- Data for Name: garagens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.garagens (id, empreendimento_id, construtora_id, torre_id, unidade_id, pavimento_garagem_id, nome, situacao, formato_vaga, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leads (id, construtora_id, empreendimento_id, nome, email, telefone, mensagem, previsao, interesse, renda, dispositivo, origem, tempo, status, created_at, updated_at, deleted_at) FROM stdin;
1	2	1	Joana Oliveira	Roberto27@hotmail.com	(31) 94009-3778	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.384024+00	\N	\N
2	2	1	Sara Moreira	JoaoPedro11@gmail.com	(95) 92606-4302	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.39266+00	\N	\N
3	2	1	Lavínia Costa	Isabela13@live.com	(14) 96516-7878	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392728+00	\N	\N
4	8	2	Maria Helena Franco	Marcia_Barros66@live.com	(70) 94914-8099	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.392739+00	\N	\N
5	8	2	César Xavier	Warley_Franco6@hotmail.com	(84) 99157-0940	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392749+00	\N	\N
6	9	3	Lorraine Franco	Felix17@hotmail.com	(59) 94796-4838	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392756+00	\N	\N
7	9	3	Warley Carvalho	Carla.Moreira88@hotmail.com	(87) 91410-4928	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.392766+00	\N	\N
8	9	3	Marcelo Souza	MariaHelena.Saraiva@live.com	(62) 94545-2813	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.392773+00	\N	\N
9	9	3	Lucca Santos	Kleber.Moreira20@hotmail.com	(39) 90504-4657	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392865+00	\N	\N
10	9	3	Isaac Souza	Matheus_Carvalho48@hotmail.com	(85) 92324-5929	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392874+00	\N	\N
11	9	3	Ígor Macedo	Isaac_Barros@hotmail.com	(57) 92500-0861	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392882+00	\N	\N
12	9	3	Paulo Reis	Maria_Xavier30@gmail.com	(55) 97666-7656	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392888+00	\N	\N
13	9	3	Beatriz Costa	Isaac29@hotmail.com	(94) 90044-4701	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392897+00	\N	\N
14	5	4	Alice Saraiva	Matheus.Souza69@live.com	(01) 95881-4803	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392903+00	\N	\N
15	5	5	Alessandra Carvalho	Maria5@live.com	(76) 95648-7160	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.39291+00	\N	\N
16	3	6	Félix Martins	Yuri.Batista70@bol.com.br	(67) 98753-0937	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392916+00	\N	\N
17	3	6	Lara Costa	Marina.Saraiva13@hotmail.com	(69) 96128-4090	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392923+00	\N	\N
18	3	6	Márcia Moraes	Murilo_Reis@yahoo.com	(25) 90596-3107	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392929+00	\N	\N
19	3	6	Júlio César Moraes	Emanuelly.Costa@live.com	(47) 90475-7189	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.392934+00	\N	\N
20	3	6	Emanuel Batista	Elisa.Melo@gmail.com	(03) 96730-0057	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.39294+00	\N	\N
21	3	6	Lavínia Nogueira	Bryan_Oliveira74@hotmail.com	(00) 93929-3310	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.392945+00	\N	\N
22	3	6	Yasmin Moreira	Elisio_Silva@yahoo.com	(34) 92393-6837	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392952+00	\N	\N
23	11	7	Margarida Xavier	Paulo.Silva@hotmail.com	(93) 97753-9851	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.392957+00	\N	\N
24	11	7	Henrique Barros	Alicia_Macedo85@yahoo.com	(05) 99272-6629	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.392963+00	\N	\N
25	11	7	Cecília Macedo	Ladislau_Reis35@live.com	(08) 99841-2001	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.392968+00	\N	\N
26	11	7	Pedro Xavier	JoaoLucas40@live.com	(69) 95508-6098	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.392973+00	\N	\N
27	11	7	Murilo Carvalho	Janaina_Martins@bol.com.br	(98) 94777-2202	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.39298+00	\N	\N
28	11	7	Pietro Barros	Raul_Nogueira40@yahoo.com	(14) 90198-5125	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.392986+00	\N	\N
29	11	7	Elísio Carvalho	Esther.Batista@live.com	(39) 92535-3118	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.392991+00	\N	\N
30	11	7	Sara Carvalho	AnaLuiza.Macedo@hotmail.com	(70) 90819-4624	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.392997+00	\N	\N
31	8	8	Davi Nogueira	Esther.Silva@gmail.com	(68) 99790-2136	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393006+00	\N	\N
32	10	9	Sirineu Carvalho	Marina.Carvalho78@live.com	(46) 96219-2400	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393012+00	\N	\N
33	10	9	Feliciano Reis	Clara_Macedo34@bol.com.br	(36) 90910-7547	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393019+00	\N	\N
34	10	9	Maria Eduarda Costa	Laura_Xavier@hotmail.com	(49) 96554-6669	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393024+00	\N	\N
35	10	9	Joaquim Saraiva	Alessandro_Oliveira@hotmail.com	(20) 97193-6491	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393029+00	\N	\N
36	10	9	Liz Macedo	Frederico_Franco@bol.com.br	(06) 97822-0682	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393036+00	\N	\N
37	3	10	Warley Pereira	Marcelo70@yahoo.com	(47) 98856-2507	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393042+00	\N	\N
38	3	10	Arthur Barros	Elisio.Nogueira@bol.com.br	(70) 91530-1027	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393047+00	\N	\N
39	3	10	Carla Reis	Rebeca25@bol.com.br	(84) 98851-5458	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393053+00	\N	\N
40	1	11	Karla Martins	Norberto.Pereira@gmail.com	(99) 94787-1271	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393059+00	\N	\N
41	1	11	César Batista	Leonardo53@gmail.com	(66) 90754-0575	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393064+00	\N	\N
42	1	11	Víctor Pereira	Bruna59@hotmail.com	(54) 98443-5853	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393071+00	\N	\N
43	1	11	Davi Lucca Braga	Rafaela64@bol.com.br	(75) 97855-0686	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393076+00	\N	\N
44	1	12	Gabriel Santos	Vicente.Moraes58@hotmail.com	(35) 95814-6000	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393082+00	\N	\N
45	1	12	Ana Laura Nogueira	Felicia_Martins@live.com	(04) 93913-8784	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393088+00	\N	\N
46	1	12	Arthur Saraiva	Lara_Barros57@yahoo.com	(92) 98489-2444	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393094+00	\N	\N
47	5	13	Pablo Batista	Gabriel78@hotmail.com	(40) 92491-4830	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393098+00	\N	\N
48	5	13	Elisa Saraiva	MariaLuiza.Oliveira@yahoo.com	(24) 97885-4433	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393104+00	\N	\N
49	5	13	Lucca Nogueira	DaviLucca.Moraes@gmail.com	(25) 98202-1417	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393111+00	\N	\N
50	5	13	Heitor Reis	MariaHelena.Batista@hotmail.com	(43) 96473-0562	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393117+00	\N	\N
51	5	13	Maria Braga	Danilo6@bol.com.br	(55) 96244-3480	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393125+00	\N	\N
52	3	14	Davi Lucca Moraes	Carlos_Franco@hotmail.com	(21) 95941-1643	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.39313+00	\N	\N
53	3	14	Lara Braga	Helio89@yahoo.com	(19) 93772-4807	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393135+00	\N	\N
54	3	14	Yago Souza	Benicio15@hotmail.com	(56) 98544-4572	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393141+00	\N	\N
55	3	14	João Lucas Xavier	Yasmin51@hotmail.com	(95) 97453-5685	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393147+00	\N	\N
56	3	14	Eduardo Braga	Giovanna_Franco4@bol.com.br	(39) 99036-4294	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393152+00	\N	\N
57	3	14	Ana Clara Santos	Fabricio.Barros10@yahoo.com	(53) 97847-4245	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393159+00	\N	\N
58	3	14	Meire Franco	Isis.Saraiva85@hotmail.com	(83) 99583-4449	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393165+00	\N	\N
59	3	117	Heloísa Oliveira	Vitor_Silva@live.com	(16) 98302-9811	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.39317+00	\N	\N
60	3	117	Lucas Saraiva	Ricardo.Souza68@yahoo.com	(64) 99790-7990	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393175+00	\N	\N
61	3	117	Arthur Franco	MariaEduarda85@hotmail.com	(77) 96487-2784	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393181+00	\N	\N
62	3	117	Marcela Macedo	Esther_Martins@live.com	(45) 92739-5115	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393187+00	\N	\N
63	3	117	Gabriel Barros	Fabiano96@bol.com.br	(95) 99010-1366	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393193+00	\N	\N
64	3	117	Calebe Batista	Gabriel4@bol.com.br	(99) 95547-9955	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393198+00	\N	\N
65	3	117	Nataniel Albuquerque	Dalila74@bol.com.br	(60) 94911-4919	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393204+00	\N	\N
66	5	15	Rafael Braga	AnaLuiza.Martins70@hotmail.com	(48) 99452-5389	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393209+00	\N	\N
67	5	15	Davi Lucca Macedo	Antonella.Macedo@hotmail.com	(76) 96107-4049	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393216+00	\N	\N
68	5	15	Calebe Moreira	Ricardo_Moreira86@live.com	(09) 96014-7717	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393222+00	\N	\N
69	5	15	Warley Batista	Mariana.Macedo@hotmail.com	(18) 92711-0397	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393228+00	\N	\N
70	7	16	Maria Eduarda Santos	Gubio23@live.com	(32) 97767-3709	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393233+00	\N	\N
71	7	16	Isabella Carvalho	Pedro.Reis@hotmail.com	(50) 93528-5515	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393239+00	\N	\N
72	11	17	Calebe Reis	Mariana_Xavier64@hotmail.com	(68) 92947-4386	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393244+00	\N	\N
73	11	17	Júlia Santos	Vitor.Moraes95@yahoo.com	(94) 98122-0465	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.39325+00	\N	\N
74	2	18	Vicente Braga	AnaLuiza_Pereira@gmail.com	(39) 95165-1198	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393255+00	\N	\N
75	6	19	Fabrício Melo	Davi.Silva23@bol.com.br	(01) 94162-4023	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393261+00	\N	\N
76	6	19	João Miguel Macedo	Isis.Batista32@bol.com.br	(35) 95392-2559	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393266+00	\N	\N
77	6	19	Maria Luiza Macedo	Larissa_Santos@bol.com.br	(15) 91385-9324	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393272+00	\N	\N
78	6	19	Mércia Nogueira	Washington.Albuquerque@bol.com.br	(46) 94248-2054	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393277+00	\N	\N
79	6	19	Arthur Barros	Heitor_Xavier@yahoo.com	(53) 96881-3034	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393285+00	\N	\N
80	6	20	Warley Reis	Yango.Oliveira18@hotmail.com	(72) 91104-6499	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.39329+00	\N	\N
81	6	20	Alícia Braga	Calebe_Reis@hotmail.com	(62) 93951-4063	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393296+00	\N	\N
82	10	21	Daniel Reis	Maite23@hotmail.com	(45) 92731-5659	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393301+00	\N	\N
83	10	21	Ana Clara Xavier	Ladislau_Batista88@live.com	(69) 90317-3513	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393306+00	\N	\N
84	10	21	Benjamin Souza	Anthony.Costa@hotmail.com	(93) 92330-8796	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393312+00	\N	\N
85	4	22	Aline Macedo	Frederico65@bol.com.br	(31) 98553-0647	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393318+00	\N	\N
86	4	22	Tertuliano Barros	Raul6@live.com	(74) 98626-3756	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393324+00	\N	\N
87	4	22	Célia Braga	Maite_Moraes70@live.com	(55) 92424-5183	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393329+00	\N	\N
88	4	22	Eduardo Costa	Victor55@hotmail.com	(29) 99375-0648	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393334+00	\N	\N
89	4	22	Ígor Batista	Lorena.Santos@live.com	(07) 92395-4358	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.39334+00	\N	\N
90	4	22	Helena Moraes	Eduardo_Moreira82@live.com	(17) 98188-0688	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393345+00	\N	\N
91	4	22	Hélio Oliveira	Aline45@gmail.com	(41) 92059-1617	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393351+00	\N	\N
92	4	22	Lara Barros	MariaClara.Reis68@gmail.com	(45) 90371-1929	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393358+00	\N	\N
93	1	23	Valentina Pereira	Theo99@hotmail.com	(70) 99096-2166	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393364+00	\N	\N
94	1	23	Giovanna Xavier	Pedro.Nogueira@yahoo.com	(06) 90400-9032	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.39337+00	\N	\N
95	1	23	Rafael Braga	Yuri.Melo91@live.com	(52) 96666-7908	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393375+00	\N	\N
96	1	23	Felipe Pereira	Heloisa_Braga@gmail.com	(77) 98476-7751	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393379+00	\N	\N
97	1	23	Mércia Oliveira	Clara.Carvalho@live.com	(00) 90725-2511	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393385+00	\N	\N
98	1	23	Paulo Batista	Roberto38@bol.com.br	(13) 97337-2374	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.39339+00	\N	\N
99	1	23	Víctor Braga	Isis82@gmail.com	(55) 99834-1709	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393396+00	\N	\N
100	1	24	Júlio Batista	Marli_Reis97@yahoo.com	(93) 90113-5586	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393401+00	\N	\N
101	1	24	Gabriel Barros	Elisio_Batista@bol.com.br	(50) 96707-6884	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393406+00	\N	\N
102	1	24	Manuela Carvalho	Carlos_Carvalho@gmail.com	(02) 99886-3792	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393411+00	\N	\N
103	1	24	Isabella Braga	Elisa.Silva@hotmail.com	(25) 97635-9910	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393417+00	\N	\N
104	1	24	Marcelo Barros	Kleber_Carvalho@bol.com.br	(70) 95061-7885	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393422+00	\N	\N
105	1	24	Felipe Moraes	Igor.Reis@gmail.com	(09) 92549-2883	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393428+00	\N	\N
106	1	24	Nicolas Oliveira	Fabio.Costa@yahoo.com	(55) 96700-7807	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393432+00	\N	\N
107	1	24	Caio Carvalho	Rafaela37@hotmail.com	(71) 91687-7056	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393438+00	\N	\N
108	8	25	Ígor Braga	AnaLaura.Braga@bol.com.br	(33) 94662-1867	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393444+00	\N	\N
109	8	25	Suélen Pereira	Sirineu69@live.com	(92) 91013-0049	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393449+00	\N	\N
110	8	25	Gabriel Souza	Alessandra59@yahoo.com	(01) 95073-9332	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393455+00	\N	\N
111	8	25	Felipe Nogueira	Warley44@hotmail.com	(13) 96055-5046	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393461+00	\N	\N
112	8	25	Silas Oliveira	Isabella_Nogueira@hotmail.com	(10) 92956-7156	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393467+00	\N	\N
113	8	25	Manuela Carvalho	Marcela_Martins@hotmail.com	(75) 94111-5588	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393474+00	\N	\N
114	2	26	Gael Martins	Lucca.Reis@gmail.com	(78) 97476-9543	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393479+00	\N	\N
115	2	26	Maria Nogueira	Isabela_Martins74@hotmail.com	(30) 98187-4454	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393484+00	\N	\N
116	2	26	Lorenzo Carvalho	Luiza.Nogueira@gmail.com	(40) 94407-4665	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393491+00	\N	\N
117	2	26	Félix Albuquerque	AnaJulia.Costa62@live.com	(37) 90145-8490	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393497+00	\N	\N
118	11	27	Aline Carvalho	Carla36@bol.com.br	(06) 93926-9824	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393502+00	\N	\N
119	11	27	Silas Braga	Gubio.Braga98@gmail.com	(03) 94891-0521	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393509+00	\N	\N
120	11	27	Emanuelly Nogueira	Anthony15@yahoo.com	(88) 90698-6627	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393514+00	\N	\N
121	11	27	Samuel Batista	MariaClara_Costa@live.com	(61) 90354-3730	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393519+00	\N	\N
122	11	27	Alícia Martins	Manuela_Silva6@hotmail.com	(18) 91500-4811	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393525+00	\N	\N
123	11	27	César Carvalho	Caio_Barros83@hotmail.com	(95) 92522-3953	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393531+00	\N	\N
124	11	27	Maria Helena Franco	Paulo.Macedo48@hotmail.com	(09) 96418-1271	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393535+00	\N	\N
125	11	27	Henrique Batista	Vitor6@bol.com.br	(40) 94021-4557	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393541+00	\N	\N
126	10	28	Maria Alice Oliveira	Maria_Saraiva@yahoo.com	(71) 96408-4780	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393546+00	\N	\N
127	10	28	Maria Cecília Batista	Joana_Moreira@gmail.com	(68) 93745-6811	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393551+00	\N	\N
128	10	28	Enzo Moreira	Felicia23@yahoo.com	(50) 95337-9566	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393556+00	\N	\N
129	10	28	Isabela Carvalho	MariaEduarda85@bol.com.br	(58) 92611-1361	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393562+00	\N	\N
130	10	28	Meire Santos	Cecilia.Macedo@hotmail.com	(01) 97016-5651	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393569+00	\N	\N
131	2	29	Daniel Santos	Rebeca14@yahoo.com	(27) 90878-8304	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393574+00	\N	\N
132	2	29	Kléber Carvalho	Karla.Pereira@bol.com.br	(12) 92427-7669	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393579+00	\N	\N
133	2	29	Miguel Albuquerque	Murilo.Saraiva@gmail.com	(37) 90121-8393	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393585+00	\N	\N
134	2	29	Maria Cecília Reis	Laura.Oliveira@hotmail.com	(97) 93905-2891	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.39359+00	\N	\N
135	2	29	Daniel Batista	Joao.Melo42@yahoo.com	(94) 94544-1350	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393596+00	\N	\N
136	5	30	Matheus Santos	Pedro97@gmail.com	(38) 98452-8800	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.3936+00	\N	\N
137	5	30	Antonella Carvalho	MariaClara_Moreira@gmail.com	(21) 93224-0694	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393605+00	\N	\N
138	5	30	Clara Saraiva	Valentina_Reis@bol.com.br	(02) 96812-1495	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393612+00	\N	\N
139	5	30	Pietro Silva	Laura.Moreira89@live.com	(14) 92773-4144	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393618+00	\N	\N
140	5	30	Giovanna Reis	Dalila.Melo@hotmail.com	(92) 96442-4578	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393623+00	\N	\N
141	5	30	Emanuelly Moreira	Bruna_Braga56@live.com	(60) 94392-6563	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393628+00	\N	\N
142	5	30	Antonella Moraes	Vitor.Costa@hotmail.com	(54) 97464-6170	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393633+00	\N	\N
143	5	30	Guilherme Macedo	Lorraine.Xavier99@hotmail.com	(14) 90039-5244	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393638+00	\N	\N
144	1	31	Karla Oliveira	Nubia_Xavier@bol.com.br	(27) 95286-7689	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393644+00	\N	\N
145	1	31	Marcos Silva	Nataniel5@hotmail.com	(39) 93643-4505	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393649+00	\N	\N
146	1	31	Feliciano Oliveira	Alexandre.Nogueira30@gmail.com	(55) 91918-4468	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393655+00	\N	\N
147	1	31	Pedro Carvalho	Karla77@gmail.com	(61) 95194-4130	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393662+00	\N	\N
148	1	31	Aline Braga	Larissa29@bol.com.br	(16) 91470-5648	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393667+00	\N	\N
149	1	31	Isabel Braga	Esther_Melo@yahoo.com	(28) 92465-5814	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393672+00	\N	\N
150	8	32	Silas Martins	Marcia_Moraes69@gmail.com	(62) 97472-8733	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393678+00	\N	\N
151	8	32	Isabela Moraes	Yuri.Moreira@yahoo.com	(86) 92056-6269	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393683+00	\N	\N
152	8	32	Joana Saraiva	Joao43@bol.com.br	(22) 93271-5635	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393688+00	\N	\N
153	8	32	Bryan Costa	MariaAlice46@hotmail.com	(97) 96960-6837	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393694+00	\N	\N
154	6	33	Sarah Oliveira	Gael20@yahoo.com	(25) 98104-2719	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.3937+00	\N	\N
155	6	33	Yango Souza	Livia.Albuquerque@hotmail.com	(71) 95847-1587	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393706+00	\N	\N
156	6	33	Fabiano Martins	Calebe12@bol.com.br	(02) 90044-9104	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393712+00	\N	\N
157	6	33	Ana Clara Moraes	Mercia_Pereira47@live.com	(60) 98467-9968	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393718+00	\N	\N
158	7	34	Esther Santos	AnaClara.Moreira78@gmail.com	(80) 93636-6390	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393723+00	\N	\N
159	7	34	Júlio Moreira	Felicia.Nogueira51@yahoo.com	(42) 97964-5944	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.39373+00	\N	\N
160	7	34	Núbia Albuquerque	Caio.Silva8@hotmail.com	(65) 90124-8667	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393736+00	\N	\N
161	7	34	Laura Xavier	Theo_Albuquerque@bol.com.br	(24) 92489-3473	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393741+00	\N	\N
162	7	34	Arthur Martins	Feliciano96@live.com	(37) 95120-6385	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393747+00	\N	\N
163	7	34	Hélio Silva	Heitor_Martins@gmail.com	(32) 94824-2057	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393753+00	\N	\N
164	7	34	Gael Oliveira	Nubia.Macedo@gmail.com	(16) 93962-5860	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393758+00	\N	\N
165	7	34	Mariana Moreira	Gustavo.Santos71@live.com	(07) 92626-3894	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393763+00	\N	\N
166	6	35	Vicente Nogueira	Liz42@gmail.com	(02) 96779-8162	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.39377+00	\N	\N
167	6	35	Felícia Santos	Felix78@live.com	(20) 93251-8610	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393775+00	\N	\N
168	6	35	Gael Nogueira	Clara_Carvalho@live.com	(20) 95078-2580	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.39378+00	\N	\N
169	6	35	Frederico Nogueira	Lucas_Carvalho@hotmail.com	(99) 94509-4503	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393786+00	\N	\N
170	1	36	Bryan Pereira	Arthur.Souza12@hotmail.com	(37) 95345-3194	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393791+00	\N	\N
171	1	36	Mércia Oliveira	Eduarda.Barros15@yahoo.com	(03) 92261-5005	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393796+00	\N	\N
172	1	36	Luiza Franco	Sarah11@live.com	(48) 99619-4692	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393802+00	\N	\N
173	1	36	Eduardo Melo	Kleber.Santos7@hotmail.com	(82) 92714-4719	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393807+00	\N	\N
174	1	36	Sara Souza	Marina81@live.com	(45) 97579-8432	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393812+00	\N	\N
175	1	36	Marli Pereira	MariaClara20@gmail.com	(50) 98008-1581	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393818+00	\N	\N
176	1	36	Nicolas Carvalho	MariaClara_Martins23@bol.com.br	(37) 99984-9030	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393824+00	\N	\N
177	1	36	Júlio Moraes	Leonardo_Nogueira11@hotmail.com	(35) 94123-2261	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393831+00	\N	\N
178	1	37	Margarida Silva	Alicia.Martins28@gmail.com	(62) 96726-7665	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393838+00	\N	\N
179	1	37	Félix Martins	Pablo_Moraes@yahoo.com	(91) 99174-4703	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393844+00	\N	\N
180	1	37	Antônio Xavier	Benicio.Carvalho@live.com	(72) 98459-2029	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393849+00	\N	\N
181	1	37	Rafael Moraes	Bryan.Albuquerque5@hotmail.com	(85) 95788-8674	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393855+00	\N	\N
182	1	37	Ana Laura Reis	Yasmin_Oliveira6@yahoo.com	(39) 96928-4732	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393861+00	\N	\N
183	1	37	Valentina Reis	Emanuelly.Moreira55@bol.com.br	(18) 99124-6897	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393867+00	\N	\N
184	1	37	Valentina Martins	Felipe_Nogueira@gmail.com	(88) 99387-2179	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393874+00	\N	\N
185	1	37	Hugo Moreira	Eduardo.Moreira13@yahoo.com	(29) 99937-6887	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.39388+00	\N	\N
186	9	38	Margarida Saraiva	Washington29@yahoo.com	(78) 92147-6833	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393886+00	\N	\N
187	9	38	Isaac Silva	Fabricio11@gmail.com	(83) 90885-9454	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.393892+00	\N	\N
188	9	38	Yango Carvalho	Yango.Moreira@hotmail.com	(35) 97698-2205	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393897+00	\N	\N
189	9	38	Noah Nogueira	Lucas31@gmail.com	(07) 93714-2457	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.393902+00	\N	\N
190	9	38	Pedro Henrique Moraes	Roberta_Oliveira60@hotmail.com	(09) 93534-4089	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393907+00	\N	\N
191	9	38	Warley Braga	Lucca11@hotmail.com	(05) 95865-8317	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393914+00	\N	\N
192	9	38	Joana Reis	Bruna86@gmail.com	(73) 90883-6306	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393919+00	\N	\N
193	4	39	Calebe Carvalho	Elisio74@yahoo.com	(32) 91591-1983	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393924+00	\N	\N
194	4	39	Valentina Carvalho	Gael.Nogueira13@yahoo.com	(92) 94946-6938	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393961+00	\N	\N
195	4	39	Enzo Gabriel Batista	Isis54@yahoo.com	(93) 90534-4135	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.393968+00	\N	\N
196	4	39	Samuel Moraes	Marcelo_Santos61@live.com	(44) 94825-9551	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393975+00	\N	\N
197	4	39	Célia Souza	Marcelo.Batista43@bol.com.br	(14) 96126-0284	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.393981+00	\N	\N
198	1	40	Vicente Xavier	Lorenzo.Saraiva34@live.com	(41) 97625-9729	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.393988+00	\N	\N
199	1	40	Karla Reis	Nicolas13@hotmail.com	(19) 96947-0497	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.393995+00	\N	\N
200	1	40	Cauã Franco	Samuel16@yahoo.com	(10) 90864-3978	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394001+00	\N	\N
201	1	40	Maria Melo	Yago.Oliveira@yahoo.com	(94) 98780-5602	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394006+00	\N	\N
202	9	41	Feliciano Franco	Rafaela_Carvalho63@gmail.com	(48) 95593-1577	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394011+00	\N	\N
203	9	41	Danilo Costa	Norberto_Silva@live.com	(65) 98620-7894	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394018+00	\N	\N
204	9	41	Isabelly Batista	Morgana94@bol.com.br	(20) 93395-7051	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394024+00	\N	\N
205	9	41	Fabrícia Macedo	JoaoPedro.Macedo@hotmail.com	(53) 94543-5988	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.39403+00	\N	\N
206	9	41	Larissa Franco	Isabella89@gmail.com	(51) 95191-8344	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394037+00	\N	\N
207	9	41	Bryan Braga	Liz_Silva@bol.com.br	(66) 92480-3069	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394042+00	\N	\N
208	9	41	Norberto Souza	Lorraine_Saraiva@hotmail.com	(13) 98194-9614	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.394047+00	\N	\N
209	9	41	Lorena Barros	Roberto_Silva50@live.com	(12) 90244-5511	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394053+00	\N	\N
210	3	42	Melissa Reis	DaviLucca30@hotmail.com	(10) 99072-8641	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394059+00	\N	\N
211	9	43	Alessandra Oliveira	Joaquim.Barros@live.com	(81) 99113-1748	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394065+00	\N	\N
212	9	43	Paulo Santos	AnaClara89@live.com	(64) 96312-9576	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394071+00	\N	\N
213	9	43	Lívia Souza	Mariana.Silva@live.com	(70) 91969-9627	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394076+00	\N	\N
214	9	43	Pablo Souza	Fabio_Carvalho@yahoo.com	(31) 90534-5782	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394081+00	\N	\N
215	9	43	Emanuel Melo	Meire.Melo49@bol.com.br	(55) 98880-3863	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394087+00	\N	\N
216	9	43	Eduardo Moraes	Larissa_Oliveira@yahoo.com	(75) 97116-7311	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394091+00	\N	\N
217	9	43	Eduardo Moraes	Anthony_Batista@yahoo.com	(56) 94000-5963	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394097+00	\N	\N
218	1	44	Isadora Costa	Caua6@hotmail.com	(41) 90340-0904	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.394103+00	\N	\N
219	1	44	Yasmin Albuquerque	Maria_Saraiva@live.com	(67) 96191-1667	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394108+00	\N	\N
220	1	44	Isaac Moraes	AnaLaura37@hotmail.com	(34) 90467-8582	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394113+00	\N	\N
221	1	44	Sílvia Santos	Antonio.Moreira@gmail.com	(83) 98838-6057	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394119+00	\N	\N
222	1	44	Pablo Franco	AnaClara49@yahoo.com	(12) 94128-8996	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394125+00	\N	\N
223	1	44	Sarah Pereira	Fabricio_Xavier40@hotmail.com	(64) 99772-1806	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.39413+00	\N	\N
224	1	44	Emanuel Franco	Hugo8@bol.com.br	(63) 96931-1223	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394136+00	\N	\N
225	1	44	Nataniel Oliveira	Yango.Santos84@yahoo.com	(50) 93436-2280	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.394141+00	\N	\N
226	2	45	Ana Clara Santos	Beatriz_Moraes95@hotmail.com	(64) 98234-7193	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394146+00	\N	\N
227	2	45	Murilo Macedo	Raul_Carvalho34@live.com	(83) 94779-6477	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394152+00	\N	\N
228	2	45	Ana Luiza Franco	EnzoGabriel32@yahoo.com	(88) 91878-5332	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394158+00	\N	\N
229	2	45	Frederico Moraes	PedroHenrique.Pereira@live.com	(42) 91372-8140	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394164+00	\N	\N
230	2	45	Gael Barros	Ricardo93@live.com	(02) 91260-0786	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394172+00	\N	\N
231	4	46	Paula Costa	Helio_Albuquerque@hotmail.com	(66) 93966-5021	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394177+00	\N	\N
232	4	46	Alícia Nogueira	Gubio15@hotmail.com	(99) 97765-9627	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394184+00	\N	\N
233	4	46	Fabrícia Santos	Lavinia.Santos41@bol.com.br	(00) 94483-6244	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394189+00	\N	\N
234	4	46	Isabelly Batista	Eloa56@hotmail.com	(74) 99354-3577	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394195+00	\N	\N
235	6	47	Fabiano Franco	Nataniel_Saraiva54@yahoo.com	(28) 98596-4157	\N	\N	\N	\N	\N	\N	\N	Em Atendimento	2026-07-20 13:49:41.394199+00	\N	\N
236	6	47	Júlio Xavier	Yuri55@yahoo.com	(14) 96337-0240	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394206+00	\N	\N
237	6	47	Noah Xavier	Breno57@hotmail.com	(25) 90063-6742	\N	\N	\N	\N	\N	\N	\N	Novo	2026-07-20 13:49:41.394211+00	\N	\N
238	6	47	Márcia Saraiva	Sarah54@gmail.com	(99) 99694-5981	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394215+00	\N	\N
239	6	47	Pietro Macedo	Antonio.Carvalho70@bol.com.br	(02) 92020-7843	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.39422+00	\N	\N
240	6	47	Marli Moraes	MariaClara_Reis91@gmail.com	(01) 93329-2879	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394227+00	\N	\N
241	5	48	Nicolas Braga	Antonio.Albuquerque@yahoo.com	(39) 95259-5313	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394233+00	\N	\N
242	5	48	Emanuelly Costa	Beatriz_Martins4@yahoo.com	(68) 98462-4178	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.39424+00	\N	\N
243	8	49	Antonella Xavier	Valentina_Macedo@live.com	(45) 92540-8950	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394246+00	\N	\N
244	8	49	Yago Braga	Nubia.Braga24@live.com	(78) 91061-8575	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394252+00	\N	\N
245	8	49	Núbia Oliveira	Rafaela_Moraes@gmail.com	(27) 92430-8228	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394256+00	\N	\N
246	8	49	Esther Pereira	Matheus.Carvalho62@bol.com.br	(64) 98879-3227	\N	\N	\N	\N	\N	\N	\N	Venda Fechada	2026-07-20 13:49:41.394263+00	\N	\N
247	8	49	Rebeca Reis	Daniel_Albuquerque@gmail.com	(01) 92616-8111	\N	\N	\N	\N	\N	\N	\N	Perdido	2026-07-20 13:49:41.394269+00	\N	\N
248	8	49	Giovanna Pereira	Heloisa_Carvalho@hotmail.com	(23) 96315-5064	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394275+00	\N	\N
249	8	49	Roberta Santos	JoaoMiguel_Xavier56@live.com	(51) 99342-5343	\N	\N	\N	\N	\N	\N	\N	Proposta em Análise	2026-07-20 13:49:41.394281+00	\N	\N
250	8	49	Pedro Henrique Pereira	Manuela.Nogueira@bol.com.br	(16) 90466-5934	\N	\N	\N	\N	\N	\N	\N	Agendou Visita	2026-07-20 13:49:41.394287+00	\N	\N
\.


--
-- Data for Name: propostas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.propostas (id, construtora_id, empreendimento_id, unidade_id, oferta_id, cliente_id, valor_proposta, entrada_proposta, quantidade_parcela, valor_parcela, saldo_remanescente, valor_bens, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: propostas_baloes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.propostas_baloes (id, proposta_id, valor, data, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: propostas_vagas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.propostas_vagas (id, proposta_id, garagem_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: quadras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quadras (id, empreendimento_id, nome, total_unidades, previsao_entrega, nomenclatura, observacoes, status, gerou_unidades, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: tabela_vendas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tabela_vendas (id, nome, construtora_id, empreendimento_id, torre_id, quadra_id, tipo_tabela_id, valor_vaga_extra, qtde_parcelas_entrada, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: tabela_vendas_baloes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tabela_vendas_baloes (id, tabela_vendas_id, percentual_balao, data_balao, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: torres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.torres (id, nome, construtora_id, empreendimento_id, previsao_entrega, etapa, status, observacoes, previsao_entrega_ano, previsao_entrega_mes, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: unidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.unidades (id, construtora_id, empreendimento_id, torre_id, quadra_id, andar_id, planta_id, nome, situacao, status, created_at, updated_at, deleted_at) FROM stdin;
1	5	5	\N	\N	\N	\N	Lote 27 Qd 5	Vendida	Liberada	2026-07-20 13:49:41.273225+00	\N	\N
2	5	5	\N	\N	\N	\N	Lote 8 Qd 3	Bloqueada	Liberada	2026-07-20 13:49:41.27331+00	\N	\N
3	5	5	\N	\N	\N	\N	Lote 38 Qd 5	Disponível	Liberada	2026-07-20 13:49:41.273311+00	\N	\N
4	5	5	\N	\N	\N	\N	Lote 32 Qd 3	Bloqueada	Liberada	2026-07-20 13:49:41.273312+00	\N	\N
5	11	7	\N	\N	\N	\N	Apt 1901	Vendida	Liberada	2026-07-20 13:49:41.273312+00	\N	\N
6	11	7	\N	\N	\N	\N	Apt 1404	Reservada	Liberada	2026-07-20 13:49:41.273314+00	\N	\N
7	11	7	\N	\N	\N	\N	Apt 1205	Vendida	Liberada	2026-07-20 13:49:41.273314+00	\N	\N
8	11	7	\N	\N	\N	\N	Apt 1904	Disponível	Liberada	2026-07-20 13:49:41.273314+00	\N	\N
9	11	7	\N	\N	\N	\N	Apt 903	Reservada	Liberada	2026-07-20 13:49:41.273314+00	\N	\N
10	11	7	\N	\N	\N	\N	Apt 1003	Disponível	Liberada	2026-07-20 13:49:41.273315+00	\N	\N
11	11	7	\N	\N	\N	\N	Apt 1505	Vendida	Liberada	2026-07-20 13:49:41.273315+00	\N	\N
12	8	8	\N	\N	\N	\N	Lote 25 Qd 9	Reservada	Liberada	2026-07-20 13:49:41.273315+00	\N	\N
13	8	8	\N	\N	\N	\N	Lote 28 Qd 9	Disponível	Liberada	2026-07-20 13:49:41.273316+00	\N	\N
14	8	8	\N	\N	\N	\N	Lote 43 Qd 5	Bloqueada	Liberada	2026-07-20 13:49:41.273316+00	\N	\N
15	8	8	\N	\N	\N	\N	Lote 50 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273316+00	\N	\N
16	3	10	\N	\N	\N	\N	Lote 7 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273318+00	\N	\N
17	3	10	\N	\N	\N	\N	Lote 15 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273318+00	\N	\N
18	3	10	\N	\N	\N	\N	Lote 33 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273318+00	\N	\N
19	3	10	\N	\N	\N	\N	Lote 14 Qd 5	Vendida	Liberada	2026-07-20 13:49:41.273319+00	\N	\N
20	3	10	\N	\N	\N	\N	Lote 47 Qd 9	Reservada	Liberada	2026-07-20 13:49:41.273319+00	\N	\N
21	3	10	\N	\N	\N	\N	Lote 28 Qd 2	Bloqueada	Liberada	2026-07-20 13:49:41.273319+00	\N	\N
22	5	15	\N	\N	\N	\N	Lote 12 Qd 3	Bloqueada	Liberada	2026-07-20 13:49:41.27332+00	\N	\N
23	5	15	\N	\N	\N	\N	Lote 31 Qd 4	Disponível	Liberada	2026-07-20 13:49:41.273321+00	\N	\N
24	5	15	\N	\N	\N	\N	Lote 30 Qd 10	Reservada	Liberada	2026-07-20 13:49:41.273321+00	\N	\N
25	5	15	\N	\N	\N	\N	Lote 44 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273323+00	\N	\N
26	5	15	\N	\N	\N	\N	Lote 32 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273323+00	\N	\N
27	11	17	\N	\N	\N	\N	Lote 25 Qd 1	Bloqueada	Liberada	2026-07-20 13:49:41.273324+00	\N	\N
28	11	17	\N	\N	\N	\N	Lote 7 Qd 4	Vendida	Liberada	2026-07-20 13:49:41.273324+00	\N	\N
29	11	17	\N	\N	\N	\N	Lote 19 Qd 2	Vendida	Liberada	2026-07-20 13:49:41.273325+00	\N	\N
30	11	17	\N	\N	\N	\N	Lote 7 Qd 9	Disponível	Liberada	2026-07-20 13:49:41.273325+00	\N	\N
31	11	17	\N	\N	\N	\N	Lote 49 Qd 4	Vendida	Liberada	2026-07-20 13:49:41.273325+00	\N	\N
32	11	17	\N	\N	\N	\N	Lote 38 Qd 4	Disponível	Liberada	2026-07-20 13:49:41.273325+00	\N	\N
33	2	18	\N	\N	\N	\N	Apt 606	Reservada	Liberada	2026-07-20 13:49:41.273326+00	\N	\N
34	2	18	\N	\N	\N	\N	Apt 307	Reservada	Liberada	2026-07-20 13:49:41.273326+00	\N	\N
35	2	18	\N	\N	\N	\N	Apt 2102	Disponível	Liberada	2026-07-20 13:49:41.273326+00	\N	\N
36	2	18	\N	\N	\N	\N	Apt 2405	Reservada	Liberada	2026-07-20 13:49:41.273327+00	\N	\N
37	2	18	\N	\N	\N	\N	Apt 602	Disponível	Liberada	2026-07-20 13:49:41.273327+00	\N	\N
38	2	18	\N	\N	\N	\N	Apt 2501	Disponível	Liberada	2026-07-20 13:49:41.273327+00	\N	\N
39	2	18	\N	\N	\N	\N	Apt 1102	Reservada	Liberada	2026-07-20 13:49:41.273327+00	\N	\N
40	2	18	\N	\N	\N	\N	Apt 2106	Disponível	Liberada	2026-07-20 13:49:41.273327+00	\N	\N
41	2	18	\N	\N	\N	\N	Apt 1502	Disponível	Liberada	2026-07-20 13:49:41.273328+00	\N	\N
42	6	19	\N	\N	\N	\N	Apt 104	Bloqueada	Liberada	2026-07-20 13:49:41.273328+00	\N	\N
43	6	19	\N	\N	\N	\N	Apt 2405	Vendida	Liberada	2026-07-20 13:49:41.273328+00	\N	\N
44	6	19	\N	\N	\N	\N	Apt 301	Disponível	Liberada	2026-07-20 13:49:41.273328+00	\N	\N
45	6	19	\N	\N	\N	\N	Apt 1701	Disponível	Liberada	2026-07-20 13:49:41.273329+00	\N	\N
46	6	19	\N	\N	\N	\N	Apt 1603	Disponível	Liberada	2026-07-20 13:49:41.273329+00	\N	\N
47	6	19	\N	\N	\N	\N	Apt 1504	Disponível	Liberada	2026-07-20 13:49:41.273329+00	\N	\N
48	6	19	\N	\N	\N	\N	Apt 407	Reservada	Liberada	2026-07-20 13:49:41.273329+00	\N	\N
49	6	19	\N	\N	\N	\N	Apt 501	Reservada	Liberada	2026-07-20 13:49:41.27333+00	\N	\N
50	4	22	\N	\N	\N	\N	Lote 23 Qd 4	Vendida	Liberada	2026-07-20 13:49:41.273331+00	\N	\N
51	4	22	\N	\N	\N	\N	Lote 43 Qd 4	Disponível	Liberada	2026-07-20 13:49:41.273331+00	\N	\N
52	4	22	\N	\N	\N	\N	Lote 4 Qd 6	Disponível	Liberada	2026-07-20 13:49:41.273331+00	\N	\N
53	4	22	\N	\N	\N	\N	Lote 11 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273331+00	\N	\N
54	4	22	\N	\N	\N	\N	Lote 20 Qd 2	Disponível	Liberada	2026-07-20 13:49:41.273333+00	\N	\N
55	4	22	\N	\N	\N	\N	Lote 40 Qd 5	Vendida	Liberada	2026-07-20 13:49:41.273333+00	\N	\N
56	4	22	\N	\N	\N	\N	Lote 1 Qd 1	Reservada	Liberada	2026-07-20 13:49:41.273333+00	\N	\N
57	4	22	\N	\N	\N	\N	Lote 4 Qd 7	Reservada	Liberada	2026-07-20 13:49:41.273334+00	\N	\N
58	4	22	\N	\N	\N	\N	Lote 6 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273334+00	\N	\N
59	8	25	\N	\N	\N	\N	Lote 17 Qd 4	Bloqueada	Liberada	2026-07-20 13:49:41.273334+00	\N	\N
60	8	25	\N	\N	\N	\N	Lote 35 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273335+00	\N	\N
61	8	25	\N	\N	\N	\N	Lote 32 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273335+00	\N	\N
62	8	25	\N	\N	\N	\N	Lote 27 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273335+00	\N	\N
63	8	25	\N	\N	\N	\N	Lote 13 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273335+00	\N	\N
64	8	25	\N	\N	\N	\N	Lote 30 Qd 9	Reservada	Liberada	2026-07-20 13:49:41.273335+00	\N	\N
65	8	25	\N	\N	\N	\N	Lote 13 Qd 2	Bloqueada	Liberada	2026-07-20 13:49:41.273336+00	\N	\N
66	8	25	\N	\N	\N	\N	Lote 6 Qd 4	Vendida	Liberada	2026-07-20 13:49:41.273336+00	\N	\N
67	8	25	\N	\N	\N	\N	Lote 18 Qd 4	Bloqueada	Liberada	2026-07-20 13:49:41.273336+00	\N	\N
68	8	25	\N	\N	\N	\N	Lote 24 Qd 10	Vendida	Liberada	2026-07-20 13:49:41.273337+00	\N	\N
69	2	26	\N	\N	\N	\N	Lote 45 Qd 10	Bloqueada	Liberada	2026-07-20 13:49:41.273337+00	\N	\N
70	2	26	\N	\N	\N	\N	Lote 13 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273337+00	\N	\N
71	2	26	\N	\N	\N	\N	Lote 17 Qd 10	Vendida	Liberada	2026-07-20 13:49:41.273337+00	\N	\N
72	2	26	\N	\N	\N	\N	Lote 47 Qd 9	Vendida	Liberada	2026-07-20 13:49:41.273338+00	\N	\N
73	11	27	\N	\N	\N	\N	Lote 25 Qd 4	Vendida	Liberada	2026-07-20 13:49:41.273338+00	\N	\N
74	11	27	\N	\N	\N	\N	Lote 22 Qd 9	Reservada	Liberada	2026-07-20 13:49:41.273338+00	\N	\N
75	11	27	\N	\N	\N	\N	Lote 48 Qd 5	Bloqueada	Liberada	2026-07-20 13:49:41.273339+00	\N	\N
76	10	28	\N	\N	\N	\N	Apt 902	Disponível	Liberada	2026-07-20 13:49:41.273339+00	\N	\N
77	10	28	\N	\N	\N	\N	Apt 308	Reservada	Liberada	2026-07-20 13:49:41.273339+00	\N	\N
78	10	28	\N	\N	\N	\N	Apt 2006	Reservada	Liberada	2026-07-20 13:49:41.273339+00	\N	\N
79	10	28	\N	\N	\N	\N	Apt 2002	Vendida	Liberada	2026-07-20 13:49:41.27334+00	\N	\N
80	10	28	\N	\N	\N	\N	Apt 2404	Disponível	Liberada	2026-07-20 13:49:41.27334+00	\N	\N
81	10	28	\N	\N	\N	\N	Apt 1608	Reservada	Liberada	2026-07-20 13:49:41.27334+00	\N	\N
82	5	30	\N	\N	\N	\N	Lote 31 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273341+00	\N	\N
83	5	30	\N	\N	\N	\N	Lote 43 Qd 7	Reservada	Liberada	2026-07-20 13:49:41.273342+00	\N	\N
84	5	30	\N	\N	\N	\N	Lote 47 Qd 9	Bloqueada	Liberada	2026-07-20 13:49:41.273342+00	\N	\N
85	5	30	\N	\N	\N	\N	Lote 4 Qd 7	Reservada	Liberada	2026-07-20 13:49:41.273342+00	\N	\N
86	5	30	\N	\N	\N	\N	Lote 39 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273342+00	\N	\N
87	5	30	\N	\N	\N	\N	Lote 38 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273342+00	\N	\N
88	5	30	\N	\N	\N	\N	Lote 3 Qd 7	Vendida	Liberada	2026-07-20 13:49:41.273343+00	\N	\N
89	5	30	\N	\N	\N	\N	Lote 15 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273343+00	\N	\N
90	5	30	\N	\N	\N	\N	Lote 22 Qd 1	Vendida	Liberada	2026-07-20 13:49:41.273343+00	\N	\N
91	1	31	\N	\N	\N	\N	Lote 34 Qd 9	Disponível	Liberada	2026-07-20 13:49:41.273343+00	\N	\N
92	1	31	\N	\N	\N	\N	Lote 12 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273344+00	\N	\N
93	1	31	\N	\N	\N	\N	Lote 8 Qd 3	Reservada	Liberada	2026-07-20 13:49:41.273344+00	\N	\N
94	1	31	\N	\N	\N	\N	Lote 17 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273344+00	\N	\N
95	1	31	\N	\N	\N	\N	Lote 41 Qd 8	Bloqueada	Liberada	2026-07-20 13:49:41.273344+00	\N	\N
96	1	31	\N	\N	\N	\N	Lote 6 Qd 2	Vendida	Liberada	2026-07-20 13:49:41.273344+00	\N	\N
97	8	32	\N	\N	\N	\N	Apt 808	Bloqueada	Liberada	2026-07-20 13:49:41.273345+00	\N	\N
98	8	32	\N	\N	\N	\N	Apt 1101	Disponível	Liberada	2026-07-20 13:49:41.273345+00	\N	\N
99	8	32	\N	\N	\N	\N	Apt 1201	Vendida	Liberada	2026-07-20 13:49:41.273345+00	\N	\N
100	6	35	\N	\N	\N	\N	Lote 45 Qd 6	Bloqueada	Liberada	2026-07-20 13:49:41.273346+00	\N	\N
101	6	35	\N	\N	\N	\N	Lote 13 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273346+00	\N	\N
102	6	35	\N	\N	\N	\N	Lote 2 Qd 1	Vendida	Liberada	2026-07-20 13:49:41.273346+00	\N	\N
103	6	35	\N	\N	\N	\N	Lote 13 Qd 10	Vendida	Liberada	2026-07-20 13:49:41.273346+00	\N	\N
104	6	35	\N	\N	\N	\N	Lote 34 Qd 9	Bloqueada	Liberada	2026-07-20 13:49:41.273347+00	\N	\N
105	6	35	\N	\N	\N	\N	Lote 49 Qd 8	Vendida	Liberada	2026-07-20 13:49:41.273347+00	\N	\N
106	6	35	\N	\N	\N	\N	Lote 47 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273347+00	\N	\N
107	6	35	\N	\N	\N	\N	Lote 12 Qd 10	Reservada	Liberada	2026-07-20 13:49:41.273347+00	\N	\N
108	9	41	\N	\N	\N	\N	Apt 104	Reservada	Liberada	2026-07-20 13:49:41.273348+00	\N	\N
109	9	41	\N	\N	\N	\N	Apt 1406	Vendida	Liberada	2026-07-20 13:49:41.273348+00	\N	\N
110	9	41	\N	\N	\N	\N	Apt 1208	Disponível	Liberada	2026-07-20 13:49:41.273349+00	\N	\N
111	9	41	\N	\N	\N	\N	Apt 2108	Disponível	Liberada	2026-07-20 13:49:41.273349+00	\N	\N
112	9	41	\N	\N	\N	\N	Apt 402	Bloqueada	Liberada	2026-07-20 13:49:41.273349+00	\N	\N
113	2	45	\N	\N	\N	\N	Lote 49 Qd 9	Disponível	Liberada	2026-07-20 13:49:41.27335+00	\N	\N
114	2	45	\N	\N	\N	\N	Lote 12 Qd 1	Reservada	Liberada	2026-07-20 13:49:41.273351+00	\N	\N
115	2	45	\N	\N	\N	\N	Lote 18 Qd 1	Disponível	Liberada	2026-07-20 13:49:41.273351+00	\N	\N
116	2	45	\N	\N	\N	\N	Lote 4 Qd 1	Disponível	Liberada	2026-07-20 13:49:41.273351+00	\N	\N
117	5	48	\N	\N	\N	\N	Apt 406	Bloqueada	Liberada	2026-07-20 13:49:41.273352+00	\N	\N
118	5	48	\N	\N	\N	\N	Apt 1407	Disponível	Liberada	2026-07-20 13:49:41.273352+00	\N	\N
119	5	48	\N	\N	\N	\N	Apt 2008	Reservada	Liberada	2026-07-20 13:49:41.273352+00	\N	\N
120	1	50	\N	\N	\N	\N	Lote 18 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273353+00	\N	\N
121	1	50	\N	\N	\N	\N	Lote 2 Qd 1	Reservada	Liberada	2026-07-20 13:49:41.273353+00	\N	\N
122	1	50	\N	\N	\N	\N	Lote 27 Qd 9	Bloqueada	Liberada	2026-07-20 13:49:41.273353+00	\N	\N
123	1	50	\N	\N	\N	\N	Lote 40 Qd 3	Vendida	Liberada	2026-07-20 13:49:41.273353+00	\N	\N
124	1	50	\N	\N	\N	\N	Lote 4 Qd 10	Reservada	Liberada	2026-07-20 13:49:41.273353+00	\N	\N
125	1	50	\N	\N	\N	\N	Lote 33 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273354+00	\N	\N
126	1	50	\N	\N	\N	\N	Lote 32 Qd 6	Disponível	Liberada	2026-07-20 13:49:41.273354+00	\N	\N
127	5	53	\N	\N	\N	\N	Apt 1502	Disponível	Liberada	2026-07-20 13:49:41.273354+00	\N	\N
128	5	53	\N	\N	\N	\N	Apt 1906	Bloqueada	Liberada	2026-07-20 13:49:41.273355+00	\N	\N
129	5	53	\N	\N	\N	\N	Apt 1903	Vendida	Liberada	2026-07-20 13:49:41.273355+00	\N	\N
130	5	53	\N	\N	\N	\N	Apt 1401	Disponível	Liberada	2026-07-20 13:49:41.273355+00	\N	\N
131	5	53	\N	\N	\N	\N	Apt 2405	Reservada	Liberada	2026-07-20 13:49:41.273355+00	\N	\N
132	5	55	\N	\N	\N	\N	Lote 22 Qd 6	Bloqueada	Liberada	2026-07-20 13:49:41.273356+00	\N	\N
133	5	55	\N	\N	\N	\N	Lote 36 Qd 9	Disponível	Liberada	2026-07-20 13:49:41.273356+00	\N	\N
134	5	55	\N	\N	\N	\N	Lote 32 Qd 8	Vendida	Liberada	2026-07-20 13:49:41.273357+00	\N	\N
135	5	55	\N	\N	\N	\N	Lote 10 Qd 5	Disponível	Liberada	2026-07-20 13:49:41.273357+00	\N	\N
136	5	55	\N	\N	\N	\N	Lote 28 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273357+00	\N	\N
137	5	55	\N	\N	\N	\N	Lote 15 Qd 10	Bloqueada	Liberada	2026-07-20 13:49:41.273358+00	\N	\N
138	5	55	\N	\N	\N	\N	Lote 34 Qd 3	Vendida	Liberada	2026-07-20 13:49:41.273358+00	\N	\N
139	5	55	\N	\N	\N	\N	Lote 9 Qd 6	Disponível	Liberada	2026-07-20 13:49:41.273358+00	\N	\N
140	5	55	\N	\N	\N	\N	Lote 35 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273358+00	\N	\N
141	5	55	\N	\N	\N	\N	Lote 47 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273359+00	\N	\N
142	5	58	\N	\N	\N	\N	Apt 1902	Reservada	Liberada	2026-07-20 13:49:41.273359+00	\N	\N
143	5	58	\N	\N	\N	\N	Apt 2001	Reservada	Liberada	2026-07-20 13:49:41.273359+00	\N	\N
144	5	58	\N	\N	\N	\N	Apt 608	Disponível	Liberada	2026-07-20 13:49:41.27336+00	\N	\N
145	5	58	\N	\N	\N	\N	Apt 202	Bloqueada	Liberada	2026-07-20 13:49:41.27336+00	\N	\N
146	5	58	\N	\N	\N	\N	Apt 1005	Reservada	Liberada	2026-07-20 13:49:41.27336+00	\N	\N
147	5	58	\N	\N	\N	\N	Apt 2105	Disponível	Liberada	2026-07-20 13:49:41.27336+00	\N	\N
148	5	58	\N	\N	\N	\N	Apt 203	Bloqueada	Liberada	2026-07-20 13:49:41.27336+00	\N	\N
149	5	58	\N	\N	\N	\N	Apt 2001	Bloqueada	Liberada	2026-07-20 13:49:41.273361+00	\N	\N
150	5	58	\N	\N	\N	\N	Apt 1408	Bloqueada	Liberada	2026-07-20 13:49:41.273361+00	\N	\N
151	11	60	\N	\N	\N	\N	Lote 49 Qd 5	Reservada	Liberada	2026-07-20 13:49:41.273361+00	\N	\N
152	11	60	\N	\N	\N	\N	Lote 24 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273362+00	\N	\N
153	11	60	\N	\N	\N	\N	Lote 4 Qd 9	Bloqueada	Liberada	2026-07-20 13:49:41.273362+00	\N	\N
154	11	60	\N	\N	\N	\N	Lote 12 Qd 2	Disponível	Liberada	2026-07-20 13:49:41.273362+00	\N	\N
155	11	60	\N	\N	\N	\N	Lote 42 Qd 5	Vendida	Liberada	2026-07-20 13:49:41.273362+00	\N	\N
156	11	60	\N	\N	\N	\N	Lote 26 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273362+00	\N	\N
157	11	60	\N	\N	\N	\N	Lote 10 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273363+00	\N	\N
158	7	61	\N	\N	\N	\N	Lote 29 Qd 8	Bloqueada	Liberada	2026-07-20 13:49:41.273363+00	\N	\N
159	7	61	\N	\N	\N	\N	Lote 13 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273363+00	\N	\N
160	7	61	\N	\N	\N	\N	Lote 30 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273363+00	\N	\N
161	7	61	\N	\N	\N	\N	Lote 50 Qd 10	Vendida	Liberada	2026-07-20 13:49:41.273364+00	\N	\N
162	4	62	\N	\N	\N	\N	Lote 46 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273364+00	\N	\N
163	4	62	\N	\N	\N	\N	Lote 25 Qd 8	Reservada	Liberada	2026-07-20 13:49:41.273364+00	\N	\N
164	4	62	\N	\N	\N	\N	Lote 3 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273365+00	\N	\N
165	4	62	\N	\N	\N	\N	Lote 24 Qd 3	Disponível	Liberada	2026-07-20 13:49:41.273365+00	\N	\N
166	4	62	\N	\N	\N	\N	Lote 39 Qd 4	Bloqueada	Liberada	2026-07-20 13:49:41.273365+00	\N	\N
167	4	62	\N	\N	\N	\N	Lote 33 Qd 3	Bloqueada	Liberada	2026-07-20 13:49:41.273365+00	\N	\N
168	4	62	\N	\N	\N	\N	Lote 44 Qd 9	Bloqueada	Liberada	2026-07-20 13:49:41.273366+00	\N	\N
169	4	62	\N	\N	\N	\N	Lote 38 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273366+00	\N	\N
170	5	63	\N	\N	\N	\N	Lote 23 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273367+00	\N	\N
171	5	63	\N	\N	\N	\N	Lote 38 Qd 1	Bloqueada	Liberada	2026-07-20 13:49:41.273367+00	\N	\N
172	5	63	\N	\N	\N	\N	Lote 7 Qd 5	Disponível	Liberada	2026-07-20 13:49:41.273367+00	\N	\N
173	5	63	\N	\N	\N	\N	Lote 25 Qd 4	Reservada	Liberada	2026-07-20 13:49:41.273367+00	\N	\N
174	5	63	\N	\N	\N	\N	Lote 11 Qd 4	Reservada	Liberada	2026-07-20 13:49:41.273367+00	\N	\N
175	5	63	\N	\N	\N	\N	Lote 36 Qd 1	Vendida	Liberada	2026-07-20 13:49:41.273368+00	\N	\N
176	5	63	\N	\N	\N	\N	Lote 30 Qd 5	Vendida	Liberada	2026-07-20 13:49:41.273368+00	\N	\N
177	5	63	\N	\N	\N	\N	Lote 36 Qd 7	Bloqueada	Liberada	2026-07-20 13:49:41.273368+00	\N	\N
178	5	63	\N	\N	\N	\N	Lote 6 Qd 6	Bloqueada	Liberada	2026-07-20 13:49:41.273368+00	\N	\N
179	3	64	\N	\N	\N	\N	Apt 601	Disponível	Liberada	2026-07-20 13:49:41.273369+00	\N	\N
180	3	64	\N	\N	\N	\N	Apt 2305	Reservada	Liberada	2026-07-20 13:49:41.273369+00	\N	\N
181	3	64	\N	\N	\N	\N	Apt 1704	Disponível	Liberada	2026-07-20 13:49:41.273369+00	\N	\N
182	8	65	\N	\N	\N	\N	Apt 2505	Reservada	Liberada	2026-07-20 13:49:41.27337+00	\N	\N
183	8	65	\N	\N	\N	\N	Apt 807	Disponível	Liberada	2026-07-20 13:49:41.27337+00	\N	\N
184	8	65	\N	\N	\N	\N	Apt 2008	Disponível	Liberada	2026-07-20 13:49:41.27337+00	\N	\N
185	8	65	\N	\N	\N	\N	Apt 404	Disponível	Liberada	2026-07-20 13:49:41.27337+00	\N	\N
186	8	65	\N	\N	\N	\N	Apt 1208	Bloqueada	Liberada	2026-07-20 13:49:41.273371+00	\N	\N
187	8	65	\N	\N	\N	\N	Apt 904	Disponível	Liberada	2026-07-20 13:49:41.273371+00	\N	\N
188	8	65	\N	\N	\N	\N	Apt 1007	Disponível	Liberada	2026-07-20 13:49:41.273371+00	\N	\N
189	11	66	\N	\N	\N	\N	Lote 34 Qd 8	Bloqueada	Liberada	2026-07-20 13:49:41.273371+00	\N	\N
190	11	66	\N	\N	\N	\N	Lote 29 Qd 8	Reservada	Liberada	2026-07-20 13:49:41.273372+00	\N	\N
191	11	66	\N	\N	\N	\N	Lote 41 Qd 7	Reservada	Liberada	2026-07-20 13:49:41.273372+00	\N	\N
192	11	66	\N	\N	\N	\N	Lote 12 Qd 10	Bloqueada	Liberada	2026-07-20 13:49:41.273372+00	\N	\N
193	11	66	\N	\N	\N	\N	Lote 1 Qd 8	Bloqueada	Liberada	2026-07-20 13:49:41.273372+00	\N	\N
194	11	66	\N	\N	\N	\N	Lote 5 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273372+00	\N	\N
195	9	67	\N	\N	\N	\N	Apt 2403	Reservada	Liberada	2026-07-20 13:49:41.273373+00	\N	\N
196	9	67	\N	\N	\N	\N	Apt 2102	Disponível	Liberada	2026-07-20 13:49:41.273373+00	\N	\N
197	9	67	\N	\N	\N	\N	Apt 1104	Vendida	Liberada	2026-07-20 13:49:41.273373+00	\N	\N
198	9	67	\N	\N	\N	\N	Apt 906	Disponível	Liberada	2026-07-20 13:49:41.273373+00	\N	\N
199	6	71	\N	\N	\N	\N	Apt 703	Vendida	Liberada	2026-07-20 13:49:41.273375+00	\N	\N
200	6	71	\N	\N	\N	\N	Apt 1104	Vendida	Liberada	2026-07-20 13:49:41.273375+00	\N	\N
201	6	71	\N	\N	\N	\N	Apt 805	Bloqueada	Liberada	2026-07-20 13:49:41.273375+00	\N	\N
202	6	71	\N	\N	\N	\N	Apt 2408	Disponível	Liberada	2026-07-20 13:49:41.273376+00	\N	\N
203	1	72	\N	\N	\N	\N	Lote 41 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273376+00	\N	\N
204	1	72	\N	\N	\N	\N	Lote 34 Qd 6	Vendida	Liberada	2026-07-20 13:49:41.273376+00	\N	\N
205	1	72	\N	\N	\N	\N	Lote 26 Qd 1	Vendida	Liberada	2026-07-20 13:49:41.273376+00	\N	\N
206	1	72	\N	\N	\N	\N	Lote 10 Qd 2	Disponível	Liberada	2026-07-20 13:49:41.273377+00	\N	\N
207	8	73	\N	\N	\N	\N	Lote 25 Qd 9	Vendida	Liberada	2026-07-20 13:49:41.273377+00	\N	\N
208	8	73	\N	\N	\N	\N	Lote 48 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273377+00	\N	\N
209	8	73	\N	\N	\N	\N	Lote 43 Qd 7	Bloqueada	Liberada	2026-07-20 13:49:41.273377+00	\N	\N
210	7	74	\N	\N	\N	\N	Lote 27 Qd 7	Bloqueada	Liberada	2026-07-20 13:49:41.273378+00	\N	\N
211	7	74	\N	\N	\N	\N	Lote 41 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273378+00	\N	\N
212	7	74	\N	\N	\N	\N	Lote 11 Qd 3	Bloqueada	Liberada	2026-07-20 13:49:41.273378+00	\N	\N
213	7	74	\N	\N	\N	\N	Lote 38 Qd 2	Reservada	Liberada	2026-07-20 13:49:41.273378+00	\N	\N
214	7	74	\N	\N	\N	\N	Lote 3 Qd 6	Disponível	Liberada	2026-07-20 13:49:41.273379+00	\N	\N
215	7	74	\N	\N	\N	\N	Lote 1 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.273379+00	\N	\N
216	7	74	\N	\N	\N	\N	Lote 23 Qd 4	Reservada	Liberada	2026-07-20 13:49:41.273379+00	\N	\N
217	7	74	\N	\N	\N	\N	Lote 10 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273379+00	\N	\N
218	9	75	\N	\N	\N	\N	Lote 50 Qd 8	Reservada	Liberada	2026-07-20 13:49:41.27338+00	\N	\N
219	9	75	\N	\N	\N	\N	Lote 43 Qd 3	Vendida	Liberada	2026-07-20 13:49:41.27338+00	\N	\N
220	9	75	\N	\N	\N	\N	Lote 22 Qd 6	Vendida	Liberada	2026-07-20 13:49:41.27338+00	\N	\N
221	9	75	\N	\N	\N	\N	Lote 40 Qd 7	Disponível	Liberada	2026-07-20 13:49:41.27338+00	\N	\N
222	9	75	\N	\N	\N	\N	Lote 48 Qd 8	Vendida	Liberada	2026-07-20 13:49:41.273381+00	\N	\N
223	2	81	\N	\N	\N	\N	Apt 2204	Vendida	Liberada	2026-07-20 13:49:41.273381+00	\N	\N
224	2	81	\N	\N	\N	\N	Apt 1304	Disponível	Liberada	2026-07-20 13:49:41.273382+00	\N	\N
225	2	81	\N	\N	\N	\N	Apt 304	Disponível	Liberada	2026-07-20 13:49:41.273382+00	\N	\N
226	2	81	\N	\N	\N	\N	Apt 1004	Vendida	Liberada	2026-07-20 13:49:41.273382+00	\N	\N
227	2	81	\N	\N	\N	\N	Apt 1304	Disponível	Liberada	2026-07-20 13:49:41.273382+00	\N	\N
228	2	81	\N	\N	\N	\N	Apt 502	Bloqueada	Liberada	2026-07-20 13:49:41.273383+00	\N	\N
229	2	81	\N	\N	\N	\N	Apt 605	Bloqueada	Liberada	2026-07-20 13:49:41.273383+00	\N	\N
230	2	81	\N	\N	\N	\N	Apt 803	Vendida	Liberada	2026-07-20 13:49:41.273383+00	\N	\N
231	8	82	\N	\N	\N	\N	Lote 26 Qd 6	Reservada	Liberada	2026-07-20 13:49:41.273384+00	\N	\N
232	8	82	\N	\N	\N	\N	Lote 6 Qd 3	Reservada	Liberada	2026-07-20 13:49:41.273384+00	\N	\N
233	8	82	\N	\N	\N	\N	Lote 36 Qd 10	Disponível	Liberada	2026-07-20 13:49:41.273384+00	\N	\N
234	8	82	\N	\N	\N	\N	Lote 8 Qd 1	Disponível	Liberada	2026-07-20 13:49:41.273385+00	\N	\N
235	2	86	\N	\N	\N	\N	Apt 503	Reservada	Liberada	2026-07-20 13:49:41.273386+00	\N	\N
236	2	86	\N	\N	\N	\N	Apt 1806	Vendida	Liberada	2026-07-20 13:49:41.273386+00	\N	\N
237	2	86	\N	\N	\N	\N	Apt 608	Bloqueada	Liberada	2026-07-20 13:49:41.273386+00	\N	\N
238	2	86	\N	\N	\N	\N	Apt 202	Disponível	Liberada	2026-07-20 13:49:41.273386+00	\N	\N
239	2	86	\N	\N	\N	\N	Apt 806	Vendida	Liberada	2026-07-20 13:49:41.273387+00	\N	\N
240	9	95	\N	\N	\N	\N	Lote 36 Qd 8	Bloqueada	Liberada	2026-07-20 13:49:41.273388+00	\N	\N
241	9	95	\N	\N	\N	\N	Lote 46 Qd 8	Disponível	Liberada	2026-07-20 13:49:41.273388+00	\N	\N
242	9	95	\N	\N	\N	\N	Lote 3 Qd 5	Bloqueada	Liberada	2026-07-20 13:49:41.273389+00	\N	\N
243	9	95	\N	\N	\N	\N	Lote 11 Qd 5	Disponível	Liberada	2026-07-20 13:49:41.273389+00	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, data_nascimento, foto_perfil, celular, telefone_fixo, whatsapp, perfil_profissional, construtora_id, created_at, updated_at, deleted_at) FROM stdin;
1	Administrador	admin@lancamentos.online	admin123	\N	\N	(65) 99999-1111	\N	\N	\N	1	2026-07-20 13:49:41.345829+00	\N	\N
\.


--
-- Name: andares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.andares_id_seq', 1, false);


--
-- Name: bairros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bairros_id_seq', 19, true);


--
-- Name: cidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cidades_id_seq', 4, true);


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 1, false);


--
-- Name: construtoras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.construtoras_id_seq', 11, true);


--
-- Name: empreendimentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empreendimentos_id_seq', 350, true);


--
-- Name: enderecos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enderecos_id_seq', 1, false);


--
-- Name: estados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estados_id_seq', 1, true);


--
-- Name: fotos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fotos_id_seq', 1, false);


--
-- Name: garagens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.garagens_id_seq', 1, false);


--
-- Name: leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leads_id_seq', 250, true);


--
-- Name: propostas_baloes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.propostas_baloes_id_seq', 1, false);


--
-- Name: propostas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.propostas_id_seq', 1, false);


--
-- Name: propostas_vagas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.propostas_vagas_id_seq', 1, false);


--
-- Name: quadras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quadras_id_seq', 1, false);


--
-- Name: tabela_vendas_baloes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tabela_vendas_baloes_id_seq', 1, false);


--
-- Name: tabela_vendas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tabela_vendas_id_seq', 1, false);


--
-- Name: torres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.torres_id_seq', 1, false);


--
-- Name: unidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unidades_id_seq', 243, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: andares p_k_andares; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.andares
    ADD CONSTRAINT p_k_andares PRIMARY KEY (id);


--
-- Name: bairros p_k_bairros; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bairros
    ADD CONSTRAINT p_k_bairros PRIMARY KEY (id);


--
-- Name: cidades p_k_cidades; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cidades
    ADD CONSTRAINT p_k_cidades PRIMARY KEY (id);


--
-- Name: clientes p_k_clientes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT p_k_clientes PRIMARY KEY (id);


--
-- Name: construtoras p_k_construtoras; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.construtoras
    ADD CONSTRAINT p_k_construtoras PRIMARY KEY (id);


--
-- Name: empreendimentos p_k_empreendimentos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empreendimentos
    ADD CONSTRAINT p_k_empreendimentos PRIMARY KEY (id);


--
-- Name: enderecos p_k_enderecos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT p_k_enderecos PRIMARY KEY (id);


--
-- Name: estados p_k_estados; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT p_k_estados PRIMARY KEY (id);


--
-- Name: fotos p_k_fotos; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fotos
    ADD CONSTRAINT p_k_fotos PRIMARY KEY (id);


--
-- Name: garagens p_k_garagens; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.garagens
    ADD CONSTRAINT p_k_garagens PRIMARY KEY (id);


--
-- Name: leads p_k_leads; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT p_k_leads PRIMARY KEY (id);


--
-- Name: propostas p_k_propostas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas
    ADD CONSTRAINT p_k_propostas PRIMARY KEY (id);


--
-- Name: propostas_baloes p_k_propostas_baloes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas_baloes
    ADD CONSTRAINT p_k_propostas_baloes PRIMARY KEY (id);


--
-- Name: propostas_vagas p_k_propostas_vagas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas_vagas
    ADD CONSTRAINT p_k_propostas_vagas PRIMARY KEY (id);


--
-- Name: quadras p_k_quadras; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quadras
    ADD CONSTRAINT p_k_quadras PRIMARY KEY (id);


--
-- Name: tabela_vendas p_k_tabela_vendas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabela_vendas
    ADD CONSTRAINT p_k_tabela_vendas PRIMARY KEY (id);


--
-- Name: tabela_vendas_baloes p_k_tabela_vendas_baloes; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabela_vendas_baloes
    ADD CONSTRAINT p_k_tabela_vendas_baloes PRIMARY KEY (id);


--
-- Name: torres p_k_torres; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torres
    ADD CONSTRAINT p_k_torres PRIMARY KEY (id);


--
-- Name: unidades p_k_unidades; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades
    ADD CONSTRAINT p_k_unidades PRIMARY KEY (id);


--
-- Name: users p_k_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT p_k_users PRIMARY KEY (id);


--
-- Name: i_x_andares_torre_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_andares_torre_id ON public.andares USING btree (torre_id);


--
-- Name: i_x_bairros_cidade_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_bairros_cidade_id ON public.bairros USING btree (cidade_id);


--
-- Name: i_x_cidades_estado_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_cidades_estado_id ON public.cidades USING btree (estado_id);


--
-- Name: i_x_empreendimentos_construtora_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_empreendimentos_construtora_id ON public.empreendimentos USING btree (construtora_id);


--
-- Name: i_x_leads_construtora_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_leads_construtora_id ON public.leads USING btree (construtora_id);


--
-- Name: i_x_leads_empreendimento_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_leads_empreendimento_id ON public.leads USING btree (empreendimento_id);


--
-- Name: i_x_propostas_baloes_proposta_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_propostas_baloes_proposta_id ON public.propostas_baloes USING btree (proposta_id);


--
-- Name: i_x_propostas_cliente_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_propostas_cliente_id ON public.propostas USING btree (cliente_id);


--
-- Name: i_x_propostas_unidade_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_propostas_unidade_id ON public.propostas USING btree (unidade_id);


--
-- Name: i_x_propostas_vagas_garagem_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_propostas_vagas_garagem_id ON public.propostas_vagas USING btree (garagem_id);


--
-- Name: i_x_propostas_vagas_proposta_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_propostas_vagas_proposta_id ON public.propostas_vagas USING btree (proposta_id);


--
-- Name: i_x_quadras_empreendimento_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_quadras_empreendimento_id ON public.quadras USING btree (empreendimento_id);


--
-- Name: i_x_tabela_vendas_baloes_tabela_vendas_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_tabela_vendas_baloes_tabela_vendas_id ON public.tabela_vendas_baloes USING btree (tabela_vendas_id);


--
-- Name: i_x_torres_empreendimento_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_torres_empreendimento_id ON public.torres USING btree (empreendimento_id);


--
-- Name: i_x_unidades_andar_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_unidades_andar_id ON public.unidades USING btree (andar_id);


--
-- Name: i_x_unidades_quadra_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_unidades_quadra_id ON public.unidades USING btree (quadra_id);


--
-- Name: i_x_unidades_torre_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_unidades_torre_id ON public.unidades USING btree (torre_id);


--
-- Name: i_x_users_construtora_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX i_x_users_construtora_id ON public.users USING btree (construtora_id);


--
-- Name: andares f_k_andares__torres_torre_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.andares
    ADD CONSTRAINT f_k_andares__torres_torre_id FOREIGN KEY (torre_id) REFERENCES public.torres(id) ON DELETE CASCADE;


--
-- Name: bairros f_k_bairros__cidades_cidade_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bairros
    ADD CONSTRAINT f_k_bairros__cidades_cidade_id FOREIGN KEY (cidade_id) REFERENCES public.cidades(id) ON DELETE CASCADE;


--
-- Name: cidades f_k_cidades__estados_estado_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cidades
    ADD CONSTRAINT f_k_cidades__estados_estado_id FOREIGN KEY (estado_id) REFERENCES public.estados(id) ON DELETE CASCADE;


--
-- Name: empreendimentos f_k_empreendimentos_construtoras_construtora_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empreendimentos
    ADD CONSTRAINT f_k_empreendimentos_construtoras_construtora_id FOREIGN KEY (construtora_id) REFERENCES public.construtoras(id) ON DELETE CASCADE;


--
-- Name: leads f_k_leads_construtoras_construtora_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT f_k_leads_construtoras_construtora_id FOREIGN KEY (construtora_id) REFERENCES public.construtoras(id) ON DELETE CASCADE;


--
-- Name: leads f_k_leads_empreendimentos_empreendimento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT f_k_leads_empreendimentos_empreendimento_id FOREIGN KEY (empreendimento_id) REFERENCES public.empreendimentos(id) ON DELETE CASCADE;


--
-- Name: propostas f_k_propostas__unidades_unidade_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas
    ADD CONSTRAINT f_k_propostas__unidades_unidade_id FOREIGN KEY (unidade_id) REFERENCES public.unidades(id) ON DELETE CASCADE;


--
-- Name: propostas_baloes f_k_propostas_baloes_propostas_proposta_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas_baloes
    ADD CONSTRAINT f_k_propostas_baloes_propostas_proposta_id FOREIGN KEY (proposta_id) REFERENCES public.propostas(id) ON DELETE CASCADE;


--
-- Name: propostas f_k_propostas_clientes_cliente_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas
    ADD CONSTRAINT f_k_propostas_clientes_cliente_id FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE CASCADE;


--
-- Name: propostas_vagas f_k_propostas_vagas_garagens_garagem_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas_vagas
    ADD CONSTRAINT f_k_propostas_vagas_garagens_garagem_id FOREIGN KEY (garagem_id) REFERENCES public.garagens(id) ON DELETE CASCADE;


--
-- Name: propostas_vagas f_k_propostas_vagas_propostas_proposta_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.propostas_vagas
    ADD CONSTRAINT f_k_propostas_vagas_propostas_proposta_id FOREIGN KEY (proposta_id) REFERENCES public.propostas(id) ON DELETE CASCADE;


--
-- Name: quadras f_k_quadras_empreendimentos_empreendimento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quadras
    ADD CONSTRAINT f_k_quadras_empreendimentos_empreendimento_id FOREIGN KEY (empreendimento_id) REFERENCES public.empreendimentos(id) ON DELETE CASCADE;


--
-- Name: tabela_vendas_baloes f_k_tabela_vendas_baloes_tabela_vendas_tabela_vendas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabela_vendas_baloes
    ADD CONSTRAINT f_k_tabela_vendas_baloes_tabela_vendas_tabela_vendas_id FOREIGN KEY (tabela_vendas_id) REFERENCES public.tabela_vendas(id) ON DELETE CASCADE;


--
-- Name: torres f_k_torres_empreendimentos_empreendimento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.torres
    ADD CONSTRAINT f_k_torres_empreendimentos_empreendimento_id FOREIGN KEY (empreendimento_id) REFERENCES public.empreendimentos(id) ON DELETE CASCADE;


--
-- Name: unidades f_k_unidades_andares_andar_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades
    ADD CONSTRAINT f_k_unidades_andares_andar_id FOREIGN KEY (andar_id) REFERENCES public.andares(id);


--
-- Name: unidades f_k_unidades_quadras_quadra_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades
    ADD CONSTRAINT f_k_unidades_quadras_quadra_id FOREIGN KEY (quadra_id) REFERENCES public.quadras(id);


--
-- Name: unidades f_k_unidades_torres_torre_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades
    ADD CONSTRAINT f_k_unidades_torres_torre_id FOREIGN KEY (torre_id) REFERENCES public.torres(id);


--
-- Name: users f_k_users_construtoras_construtora_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT f_k_users_construtoras_construtora_id FOREIGN KEY (construtora_id) REFERENCES public.construtoras(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 6mfcHWP38gdOJhLGBBKrnYWuvlF409CDE9J1b4c43A44rZEZTMgWRk6A5GBsM2m

