--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-09 21:46:12

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24760)
-- Name: contactos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contactos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo_electronico character varying(100) NOT NULL,
    asunto character varying(50) NOT NULL,
    mensaje text NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contactos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24759)
-- Name: contactos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contactos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contactos_id_seq OWNER TO postgres;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 219
-- Name: contactos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contactos_id_seq OWNED BY public.contactos.id;


--
-- TOC entry 218 (class 1259 OID 24747)
-- Name: reservas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    pelicula character varying(100) NOT NULL,
    fecha_reserva timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    hora_funcion timestamp without time zone NOT NULL,
    asientos character varying(255) NOT NULL
);


ALTER TABLE public.reservas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24746)
-- Name: reservas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservas_id_seq OWNER TO postgres;

--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 217
-- Name: reservas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservas_id_seq OWNED BY public.reservas.id;


--
-- TOC entry 216 (class 1259 OID 24714)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    tipo_documento character varying(20) NOT NULL,
    numero_documento character varying(50) NOT NULL,
    fecha_nacimiento date NOT NULL,
    genero character varying(20),
    telefono character varying(20),
    email character varying(100) NOT NULL,
    "contraseña" character varying(100) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    rol character varying(50) DEFAULT 'usuario'::character varying
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24713)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4703 (class 2604 OID 24763)
-- Name: contactos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactos ALTER COLUMN id SET DEFAULT nextval('public.contactos_id_seq'::regclass);


--
-- TOC entry 4701 (class 2604 OID 24750)
-- Name: reservas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas ALTER COLUMN id SET DEFAULT nextval('public.reservas_id_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 24717)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4864 (class 0 OID 24760)
-- Dependencies: 220
-- Data for Name: contactos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contactos (id, nombre, correo_electronico, asunto, mensaje, fecha) FROM stdin;
1	kevin guerrero	kevidavidguerreroperea@gmail.com	2	jfalkjldjfklfjñalsdjfjakjfasjfjakdnfkajdkfnakdfkjfjafkdjfksdjfdkdsjfkljsdñfkljakfjañkfjñfj	2024-11-17 05:42:57.146301
\.


--
-- TOC entry 4862 (class 0 OID 24747)
-- Dependencies: 218
-- Data for Name: reservas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservas (id, usuario_id, pelicula, fecha_reserva, hora_funcion, asientos) FROM stdin;
19	3	La Última Estrella	2024-12-09 17:08:13.717279	2024-12-16 09:09:00	C4, D4
21	3	La Última Estrella	2024-12-09 19:25:08.042093	2024-12-16 21:09:00	D4, C4
22	3		2024-12-09 19:53:05.143895	2024-12-09 09:54:00	D3, C3
23	3	Aventuras en el Bosque Encantado	2024-12-09 19:53:32.417002	2024-12-09 09:54:00	D3, C3
24	3	El Susurro de las Sombras	2024-12-09 19:53:37.979879	2024-12-09 09:54:00	D3, C3
25	3	La Última Estrella	2024-12-09 19:53:41.519746	2024-12-09 09:54:00	D3, C3
\.


--
-- TOC entry 4860 (class 0 OID 24714)
-- Dependencies: 216
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, "contraseña", fecha_registro, rol) FROM stdin;
2	Lorena	Perea	CC	29114479	1979-02-03	Femenino	3145029124	lore982509@gmail.com	lp982509	2024-11-16 16:11:12.961001	usuario
6	ssesilio	lopez lopez	CC	1434456752	2005-06-17	Masculino	3142345678	sesiliolopezlopez@gmail.com	$2a$10$GycoFaODHfSmO9aZXZSMX.wkBY8.kkkowhWo7vkC/Tt.qfXsBNyPC	2024-11-17 00:21:37.823321	usuario
3	Kevin	Guerrero	CC	1193595219	2003-11-17	Masculino	3143593932	kevidavidguerreroperea@gmail.com	$2a$10$Yak26Kxe7KICQOQg5miEFOlTyRyAN5/dSXS5bUuSblOmCWyhlrNXi	2024-11-16 16:19:33.008232	usuario
7	lucio	perez perez	CC	5366273817623	2008-06-19	Masculino	314366987	lucioperezperez@gmail.com	$2a$10$YWATlQ8mPtkpGa.wgpFjR.XltjZo8jGTQ8VaL21z9FxhMb4N6RJrO	2024-11-17 18:56:17.292626	usuario
8	rodolfo	perez	CC	1122334455	1979-02-03	Masculino	3142233445	admin01@gmail.com	$2a$10$1AuI1uUKV.tOXw65epoMqOplUR1zizsOIjno8ieH2Gq8pFeyqCvz.	2024-12-09 20:11:43.363087	admin
9	manuela	martinez 	CC	665544332210	2010-02-28	Femenino	3140099889	manuelamartinez@gmail.com	$2a$10$zurQY7mmPik0PI3lLUUPs.rXj/9729d2XKQPjryShwLeYqlSyI5lW	2024-12-09 21:27:00.788595	usuario
\.


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 219
-- Name: contactos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contactos_id_seq', 1, true);


--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 217
-- Name: reservas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservas_id_seq', 25, true);


--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 9, true);


--
-- TOC entry 4714 (class 2606 OID 24768)
-- Name: contactos contactos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contactos
    ADD CONSTRAINT contactos_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 24753)
-- Name: reservas reservas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 24726)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4708 (class 2606 OID 24724)
-- Name: usuarios usuarios_numero_documento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_numero_documento_key UNIQUE (numero_documento);


--
-- TOC entry 4710 (class 2606 OID 24722)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 24754)
-- Name: reservas reservas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2024-12-09 21:46:13

--
-- PostgreSQL database dump complete
--

