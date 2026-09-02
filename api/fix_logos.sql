UPDATE construtoras SET logo = NULL WHERE logo LIKE '%/construtora/%/construtora/%';
SELECT id, nome, logo FROM construtoras WHERE id IN (5, 6, 106);
