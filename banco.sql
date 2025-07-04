PGDMP                      }            Transportadora    17.4    17.4 ?    e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            h           1262    25118    Transportadora    DATABASE     v   CREATE DATABASE "Transportadora" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'pt-BR';
     DROP DATABASE "Transportadora";
                     postgres    false            �            1255    25119 L   criar_despacho(character varying, character varying, bigint, bigint, bigint) 	   PROCEDURE     �  CREATE PROCEDURE public.criar_despacho(IN p_status character varying, IN p_cidade_despacho character varying, IN p_carga_id bigint, IN p_motorista_id bigint, IN p_caminhao_id bigint)
    LANGUAGE plpgsql
    AS $$BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM carga WHERE carga_id = p_carga_id) THEN
       
       RAISE EXCEPTION 'Carga com ID % não encontrada', p_carga_id;
       
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM motorista WHERE motorista_id = p_motorista_id) THEN
       
       RAISE EXCEPTION 'Motorista com ID % não encontrado', p_motorista_id;
       
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM caminhao WHERE caminhao_id = p_caminhao_id) THEN
       
       RAISE EXCEPTION 'Caminhão com ID % não encontrado', p_caminhao_id;
       
    END IF;
    
    INSERT INTO despacho (dt_inic, status, cidade_despacho, carga_id, motorista_id, caminhao_id)
         VALUES (CURRENT_DATE, p_status, p_cidade_despacho, p_carga_id, p_motorista_id, p_caminhao_id);
END;$$;
 �   DROP PROCEDURE public.criar_despacho(IN p_status character varying, IN p_cidade_despacho character varying, IN p_carga_id bigint, IN p_motorista_id bigint, IN p_caminhao_id bigint);
       public               postgres    false            �            1259    25121    caminhao    TABLE       CREATE TABLE public.caminhao (
    caminhao_id bigint NOT NULL,
    placa character varying(10) NOT NULL,
    modelo character varying(100) NOT NULL,
    capacidade character varying(10) NOT NULL,
    status boolean,
    tp_carroceria character varying(100),
    motorista_id bigint
);
    DROP TABLE public.caminhao;
       public         heap r       postgres    false            �            1259    25124    caminhao_caminhao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.caminhao_caminhao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.caminhao_caminhao_id_seq;
       public               postgres    false    217            i           0    0    caminhao_caminhao_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.caminhao_caminhao_id_seq OWNED BY public.caminhao.caminhao_id;
          public               postgres    false    218            �            1259    25125    carga    TABLE     =  CREATE TABLE public.carga (
    carga_id bigint NOT NULL,
    origem character varying(20) NOT NULL,
    destino character varying(20) NOT NULL,
    peso numeric(7,2) NOT NULL,
    tipo_carga character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    cliente_id bigint,
    endereco_id bigint
);
    DROP TABLE public.carga;
       public         heap r       postgres    false            �            1259    25128    carga_carga_id_seq    SEQUENCE     {   CREATE SEQUENCE public.carga_carga_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.carga_carga_id_seq;
       public               postgres    false    219            j           0    0    carga_carga_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.carga_carga_id_seq OWNED BY public.carga.carga_id;
          public               postgres    false    220            �            1259    25129    clientes    TABLE     �   CREATE TABLE public.clientes (
    cliente_id bigint NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(100) NOT NULL,
    endereco_id bigint
);
    DROP TABLE public.clientes;
       public         heap r       postgres    false            �            1259    25132    cliente_cliente_id_seq    SEQUENCE        CREATE SEQUENCE public.cliente_cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_cliente_id_seq;
       public               postgres    false    221            k           0    0    cliente_cliente_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.cliente_cliente_id_seq OWNED BY public.clientes.cliente_id;
          public               postgres    false    222            �            1259    25133    despacho    TABLE       CREATE TABLE public.despacho (
    despacho_id bigint NOT NULL,
    dt_inic date NOT NULL,
    dt_fim date,
    status character varying(100) NOT NULL,
    cidade_despacho character varying(100) NOT NULL,
    carga_id bigint NOT NULL,
    motorista_id bigint,
    caminhao_id bigint
);
    DROP TABLE public.despacho;
       public         heap r       postgres    false            �            1259    25136    despacho_despacho_id_seq    SEQUENCE     �   CREATE SEQUENCE public.despacho_despacho_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.despacho_despacho_id_seq;
       public               postgres    false    223            l           0    0    despacho_despacho_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.despacho_despacho_id_seq OWNED BY public.despacho.despacho_id;
          public               postgres    false    224            �            1259    25137 	   motorista    TABLE       CREATE TABLE public.motorista (
    motorista_id bigint NOT NULL,
    cpf character varying(15) NOT NULL,
    cnh integer NOT NULL,
    contato character varying(12) NOT NULL,
    endereco_id bigint,
    caminhao_id bigint,
    nome character varying(50)
);
    DROP TABLE public.motorista;
       public         heap r       postgres    false            �            1259    25140    despachos_view    VIEW     �  CREATE VIEW public.despachos_view AS
 SELECT a.dt_fim,
    a.cidade_despacho,
    c.peso,
    b.nome,
    d.modelo
   FROM public.despacho a,
    public.motorista b,
    public.carga c,
    public.caminhao d
  WHERE ((a.motorista_id = b.motorista_id) AND (a.carga_id = c.carga_id) AND (a.caminhao_id = d.caminhao_id) AND ((b.nome)::text = 'Anderson Andreis'::text) AND ((a.dt_fim >= '2025-07-01'::date) AND (a.dt_fim <= '2025-07-31'::date)));
 !   DROP VIEW public.despachos_view;
       public       v       postgres    false    223    225    225    223    223    223    223    219    219    217    217            �            1259    25144    endereco    TABLE       CREATE TABLE public.endereco (
    endereco_id bigint NOT NULL,
    cep character varying(10) NOT NULL,
    rua character varying(60) NOT NULL,
    numero integer NOT NULL,
    cidade character varying(60) NOT NULL,
    complemento character(5) NOT NULL
);
    DROP TABLE public.endereco;
       public         heap r       postgres    false            �            1259    25147    endereco_endereco_id_seq    SEQUENCE     �   CREATE SEQUENCE public.endereco_endereco_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.endereco_endereco_id_seq;
       public               postgres    false    227            m           0    0    endereco_endereco_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.endereco_endereco_id_seq OWNED BY public.endereco.endereco_id;
          public               postgres    false    228            �            1259    25148    motorista_motorista_id_seq    SEQUENCE     �   CREATE SEQUENCE public.motorista_motorista_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.motorista_motorista_id_seq;
       public               postgres    false    225            n           0    0    motorista_motorista_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.motorista_motorista_id_seq OWNED BY public.motorista.motorista_id;
          public               postgres    false    229            �           2604    25149    caminhao caminhao_id    DEFAULT     |   ALTER TABLE ONLY public.caminhao ALTER COLUMN caminhao_id SET DEFAULT nextval('public.caminhao_caminhao_id_seq'::regclass);
 C   ALTER TABLE public.caminhao ALTER COLUMN caminhao_id DROP DEFAULT;
       public               postgres    false    218    217            �           2604    25150    carga carga_id    DEFAULT     p   ALTER TABLE ONLY public.carga ALTER COLUMN carga_id SET DEFAULT nextval('public.carga_carga_id_seq'::regclass);
 =   ALTER TABLE public.carga ALTER COLUMN carga_id DROP DEFAULT;
       public               postgres    false    220    219            �           2604    25151    clientes cliente_id    DEFAULT     y   ALTER TABLE ONLY public.clientes ALTER COLUMN cliente_id SET DEFAULT nextval('public.cliente_cliente_id_seq'::regclass);
 B   ALTER TABLE public.clientes ALTER COLUMN cliente_id DROP DEFAULT;
       public               postgres    false    222    221            �           2604    25152    despacho despacho_id    DEFAULT     |   ALTER TABLE ONLY public.despacho ALTER COLUMN despacho_id SET DEFAULT nextval('public.despacho_despacho_id_seq'::regclass);
 C   ALTER TABLE public.despacho ALTER COLUMN despacho_id DROP DEFAULT;
       public               postgres    false    224    223            �           2604    25153    endereco endereco_id    DEFAULT     |   ALTER TABLE ONLY public.endereco ALTER COLUMN endereco_id SET DEFAULT nextval('public.endereco_endereco_id_seq'::regclass);
 C   ALTER TABLE public.endereco ALTER COLUMN endereco_id DROP DEFAULT;
       public               postgres    false    228    227            �           2604    25154    motorista motorista_id    DEFAULT     �   ALTER TABLE ONLY public.motorista ALTER COLUMN motorista_id SET DEFAULT nextval('public.motorista_motorista_id_seq'::regclass);
 E   ALTER TABLE public.motorista ALTER COLUMN motorista_id DROP DEFAULT;
       public               postgres    false    229    225            W          0    25121    caminhao 
   TABLE DATA           o   COPY public.caminhao (caminhao_id, placa, modelo, capacidade, status, tp_carroceria, motorista_id) FROM stdin;
    public               postgres    false    217   �Q       Y          0    25125    carga 
   TABLE DATA           m   COPY public.carga (carga_id, origem, destino, peso, tipo_carga, status, cliente_id, endereco_id) FROM stdin;
    public               postgres    false    219   R       [          0    25129    clientes 
   TABLE DATA           O   COPY public.clientes (cliente_id, nome, email, senha, endereco_id) FROM stdin;
    public               postgres    false    221   eR       ]          0    25133    despacho 
   TABLE DATA           ~   COPY public.despacho (despacho_id, dt_inic, dt_fim, status, cidade_despacho, carga_id, motorista_id, caminhao_id) FROM stdin;
    public               postgres    false    223   �R       `          0    25144    endereco 
   TABLE DATA           V   COPY public.endereco (endereco_id, cep, rua, numero, cidade, complemento) FROM stdin;
    public               postgres    false    227   �R       _          0    25137 	   motorista 
   TABLE DATA           d   COPY public.motorista (motorista_id, cpf, cnh, contato, endereco_id, caminhao_id, nome) FROM stdin;
    public               postgres    false    225   :S       o           0    0    caminhao_caminhao_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.caminhao_caminhao_id_seq', 2, true);
          public               postgres    false    218            p           0    0    carga_carga_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.carga_carga_id_seq', 4, true);
          public               postgres    false    220            q           0    0    cliente_cliente_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_cliente_id_seq', 4, true);
          public               postgres    false    222            r           0    0    despacho_despacho_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.despacho_despacho_id_seq', 4, true);
          public               postgres    false    224            s           0    0    endereco_endereco_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.endereco_endereco_id_seq', 6, true);
          public               postgres    false    228            t           0    0    motorista_motorista_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.motorista_motorista_id_seq', 26, true);
          public               postgres    false    229            �           2606    25156    caminhao caminhao_id 
   CONSTRAINT     q   ALTER TABLE ONLY public.caminhao
    ADD CONSTRAINT caminhao_id PRIMARY KEY (caminhao_id) INCLUDE (caminhao_id);
 >   ALTER TABLE ONLY public.caminhao DROP CONSTRAINT caminhao_id;
       public                 postgres    false    217            �           2606    25158    carga carga_id 
   CONSTRAINT     e   ALTER TABLE ONLY public.carga
    ADD CONSTRAINT carga_id PRIMARY KEY (carga_id) INCLUDE (carga_id);
 8   ALTER TABLE ONLY public.carga DROP CONSTRAINT carga_id;
       public                 postgres    false    219            �           2606    25160    clientes cliente_id 
   CONSTRAINT     n   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT cliente_id PRIMARY KEY (cliente_id) INCLUDE (cliente_id);
 =   ALTER TABLE ONLY public.clientes DROP CONSTRAINT cliente_id;
       public                 postgres    false    221            �           2606    25162    despacho despacho_id 
   CONSTRAINT     q   ALTER TABLE ONLY public.despacho
    ADD CONSTRAINT despacho_id PRIMARY KEY (despacho_id) INCLUDE (despacho_id);
 >   ALTER TABLE ONLY public.despacho DROP CONSTRAINT despacho_id;
       public                 postgres    false    223            �           2606    25164    endereco endereco_id 
   CONSTRAINT     q   ALTER TABLE ONLY public.endereco
    ADD CONSTRAINT endereco_id PRIMARY KEY (endereco_id) INCLUDE (endereco_id);
 >   ALTER TABLE ONLY public.endereco DROP CONSTRAINT endereco_id;
       public                 postgres    false    227            �           2606    25166    motorista motorista_id 
   CONSTRAINT     u   ALTER TABLE ONLY public.motorista
    ADD CONSTRAINT motorista_id PRIMARY KEY (motorista_id) INCLUDE (motorista_id);
 @   ALTER TABLE ONLY public.motorista DROP CONSTRAINT motorista_id;
       public                 postgres    false    225            �           1259    25167    fki_caminhao_id    INDEX     L   CREATE INDEX fki_caminhao_id ON public.motorista USING btree (caminhao_id);
 #   DROP INDEX public.fki_caminhao_id;
       public                 postgres    false    225            �           1259    25168    fki_carga_id    INDEX     E   CREATE INDEX fki_carga_id ON public.despacho USING btree (carga_id);
     DROP INDEX public.fki_carga_id;
       public                 postgres    false    223            �           1259    25169    fki_cliente_id    INDEX     F   CREATE INDEX fki_cliente_id ON public.carga USING btree (cliente_id);
 "   DROP INDEX public.fki_cliente_id;
       public                 postgres    false    219            �           1259    25170    fki_endereco_id    INDEX     K   CREATE INDEX fki_endereco_id ON public.clientes USING btree (endereco_id);
 #   DROP INDEX public.fki_endereco_id;
       public                 postgres    false    221            �           1259    25171    fki_m    INDEX     B   CREATE INDEX fki_m ON public.motorista USING btree (caminhao_id);
    DROP INDEX public.fki_m;
       public                 postgres    false    225            �           1259    25172    fki_motorista_id    INDEX     M   CREATE INDEX fki_motorista_id ON public.despacho USING btree (motorista_id);
 $   DROP INDEX public.fki_motorista_id;
       public                 postgres    false    223            �           2606    25173    motorista caminhao_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.motorista
    ADD CONSTRAINT caminhao_id FOREIGN KEY (caminhao_id) REFERENCES public.caminhao(caminhao_id) NOT VALID;
 ?   ALTER TABLE ONLY public.motorista DROP CONSTRAINT caminhao_id;
       public               postgres    false    217    4779    225            �           2606    25178    despacho caminhao_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.despacho
    ADD CONSTRAINT caminhao_id FOREIGN KEY (caminhao_id) REFERENCES public.caminhao(caminhao_id) NOT VALID;
 >   ALTER TABLE ONLY public.despacho DROP CONSTRAINT caminhao_id;
       public               postgres    false    217    223    4779            �           2606    25183    despacho carga_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.despacho
    ADD CONSTRAINT carga_id FOREIGN KEY (carga_id) REFERENCES public.carga(carga_id) NOT VALID;
 ;   ALTER TABLE ONLY public.despacho DROP CONSTRAINT carga_id;
       public               postgres    false    223    4781    219            �           2606    25188    carga cliente_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.carga
    ADD CONSTRAINT cliente_id FOREIGN KEY (cliente_id) REFERENCES public.clientes(cliente_id) NOT VALID;
 :   ALTER TABLE ONLY public.carga DROP CONSTRAINT cliente_id;
       public               postgres    false    219    221    4784            �           2606    25193    clientes endereco_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT endereco_id FOREIGN KEY (endereco_id) REFERENCES public.endereco(endereco_id) NOT VALID;
 >   ALTER TABLE ONLY public.clientes DROP CONSTRAINT endereco_id;
       public               postgres    false    227    4795    221            �           2606    25198    motorista endereco_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.motorista
    ADD CONSTRAINT endereco_id FOREIGN KEY (endereco_id) REFERENCES public.endereco(endereco_id) NOT VALID;
 ?   ALTER TABLE ONLY public.motorista DROP CONSTRAINT endereco_id;
       public               postgres    false    225    227    4795            �           2606    25203    carga endereco_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.carga
    ADD CONSTRAINT endereco_id FOREIGN KEY (endereco_id) REFERENCES public.endereco(endereco_id) NOT VALID;
 ;   ALTER TABLE ONLY public.carga DROP CONSTRAINT endereco_id;
       public               postgres    false    4795    219    227            �           2606    25208    despacho motorista_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.despacho
    ADD CONSTRAINT motorista_id FOREIGN KEY (motorista_id) REFERENCES public.motorista(motorista_id) NOT VALID;
 ?   ALTER TABLE ONLY public.despacho DROP CONSTRAINT motorista_id;
       public               postgres    false    223    4793    225            �           2606    25213    caminhao motorista_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.caminhao
    ADD CONSTRAINT motorista_id FOREIGN KEY (motorista_id) REFERENCES public.motorista(motorista_id) NOT VALID;
 ?   ALTER TABLE ONLY public.caminhao DROP CONSTRAINT motorista_id;
       public               postgres    false    217    225    4793            W   5   x�3�ttr642���OI��W0�4400�,�LN,*�ON-�L���q��qqq �      Y   B   x�3�t�H,HM>��3"�"3�����@����5'��(?/39��5W!����̒|NN3�=... .��      [   6   x�3���?�8_�=1�(35�399?+?1�!=713G/9?���Ș3Ə+F��� {D      ]   5   x�3�4202�50�50�2�AL���Ģ�ļ�|ΈĊ�\NN#3N#�=... 9��      `   :   x�3㴰�04220�*MTp��K9�PAW�����Ґ�9#� 5��fN ������ X�      _   C   x�32�442�315�3���54 q�< �����������3���RR���������b�=... �]�     