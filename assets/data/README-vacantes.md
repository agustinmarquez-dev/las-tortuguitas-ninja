# Vacantes Resumen

El mapa de calor lee primero `vacantes-resumen.csv`.

## Actualizacion semanal

1. Exportar o copiar la hoja `Resumen` como CSV.
2. Reemplazar `assets/data/vacantes-resumen.csv`.
3. Ejecutar desde la raiz del proyecto:

```bash
npm run actualizar-vacantes
```

Ese comando regenera `assets/data/vacantes-resumen-data.js`, que permite que el mapa funcione tambien al abrirlo localmente con `file://`.

4. Subir a GitHub:

```bash
git add assets/data/vacantes-resumen.csv assets/data/vacantes-resumen-data.js
git commit -m "Actualizar vacantes resumen"
git push
```

Formato esperado:

```csv
Local,Total,Pendientes,Cubiertas,% Cumpl.,ETM,ETR,ETN,GT,,Local,Total,Pendientes,Cubiertas,% Cumpl.,ETM,ETR,ETN,GT
SAAVEDRA,4,3,1,25%,,,,,,APER MATADEROS,17,10,7,41%,,1,,
```

Reglas:

- En el formato real de la hoja `Resumen`, Sabores Express queda en las columnas izquierdas y Hamburguesas Extremas en las columnas derechas.
- Para Sabores, el mapa lee:
  - nombre del local: columna 1
  - vacantes pendientes: columna 3
- Para Extremas, el mapa lee:
  - nombre del local: columna 11
  - vacantes pendientes: columna 13
- Los nombres de locales deben coincidir con las claves de coordenadas dentro de `pages/mapa-calor.html`.
