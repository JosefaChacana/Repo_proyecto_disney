# Fuente de datos y metodología de construcción
Junto a mi dupla decidimos que la base de nuestros datos compartiría un mismo punto de partida; lo que vendría siendo el historial de todas las películas producidas y coproducidas por Walt Disney. Esta amplia lista de títulos fue extraída de Wikipedia, descargada y, posteriormente, trabajada en una hoja de Excel. Sin embargo, realizamos su limpieza de datos priorizando dejar solamente el título de la obra (en español e inglés), junto a su respectivo año de estreno, eliminando así la información que no aportaba a nuestra hipótesis, como si las películas habían sido producidas para la plataforma digital de la compañía. 

Para mi base de datos, utilicé dos dataset de la plataforma Kaggle:

El primero, **“Disney Movies and Films Dataset”** (Disney Movies and Films Dataset), que me proporcionó la cifra (en dólares) de la respectiva inversión de cada película.
La segunda, **“Disney Movies 1937-2016 Gross Income”** (Disney Movies 1937-2016 Gross Income) me dió la recaudación de cada película. Cabe destacar que, junto a mi dupla, decidimos utilizar el monto con la inflación aplicada para así tener una perspectiva más cercana a lo que sería un monto actual y hacer una comparación más realista posteriormente. 
Hubo un par de casos donde la cifra de ambos tópicos no existía en ninguno de los dataset, por lo que complementé las casillas con la información obtenida en **IMBD** (https://www.imdb.com/es/?ref_=tt_nv_home).   

Los datos base, obtenidos en Wikipedia, fueron **organizados pasando automáticamente la tabla que contenía los títulos y años de estreno de cada película. Los datos de inversión - recaudación**, extraídos de las dataset e IMDB, fueron incluidos de forma **manual.**

## Alcance de los datos
La base de datos abarca un extenso período histórico de la industria, que se extiende desde 1937 hasta el año actual, 2025. 

## Características de los datos 
Pese a que mantuve intacto el monto de la cifra según su origen, sin realizar ninguna modificación, estas organizadas e integradas en mi propia tabla, lo que las convertiría en datos **procesados.** 

La base resulta tener una combinación de datos **cualitativos** (la clasificación de los títulos en ambos idiomas) y datos **cuantitativos** (años de estreno y sus respectivas cifras de inversión - recaudación).

Con el propósito de asegurar una fácil y ordenada comprensión, los datos son de **fuente abierta.**


## Variables Incorporadas : Variable / Descripción. 
+ Título en español : Traducción del título de la película.
+ Título original : Nombre original de la película. 
+ Fecha de estreno: Año en el que la película fue estrenada públicamente (o en cines).
+ Inversión: Monto total destinado a la producción de la película.
+ Recaudación: Ingresos obtenidos a nivel mundial por la obra. 
