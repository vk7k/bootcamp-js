# Actividad de aprendizaje

## Instrucciones

### 1. SQL

Considerando el desorden financiero que lo tiene aparentemente al borde de la ruina y haciendo gala de su nueva habilidad con SQL, ha decidido ordenar la información en una base de datos con el fin de sacar ciertas conclusiones. Para ello ha dispuesto la información ordenada en cuotas mensuales. Considere la siguiente tabla (`actividad4.sql`):

```sql
select * from finanzas_personales
```

| nombre (PK)        | me_debe | cuotas_cobrar | le_debo | cuotas_pagar |
|---------------------|--------:|---------------:|--------:|--------------:|
| tía carmen          | 0       | 0               | 5000    | 1              |
| papá                | 0       | 0               | 15000   | 3              |
| nacho               | 10000   | 2               | 7000    | 1              |
| almacén esquina     | 0       | 0               | 13000   | 2              |
| vicios varios       | 0       | 0               | 35000   | 35             |
| compañero trabajo   | 50000   | 5               | 0       | 0              |

Crear una consulta SQL para averiguar:

1. A quién(es) le debe más dinero y cuánto
2. Quién(es) le debe más dinero a ud. y cuánto
3. Cuánto dinero debe en total

**Me deben**

| Me deben |
|---------:|
| 60000    |

4. Cuánto dinero debe en promedio.
5. Suponiendo que no puede pagar más de una cuota al mes. ¿Cuántos meses demoraría en saldar su deuda?

**Respuesta estándar:**

| meses |
|------:|
| 42    |

**Respuesta experta:**

| años | meses |
|-----:|------:|
| 3    | 6     |

6. Suponga que logra cobrar todo lo que le deben en un mismo día y decide usar **todo** eso para pagar lo que se pueda de su deuda.
   - ¿A cuánto ascendería su nueva deuda reducida?
   - ¿Cuánto tendría que pagar mensualmente para pagar todo lo que resta en las cuotas ya acordadas?

| Valor cuota |
|------------:|
| 357         |

---

*Repentinamente recibes una llamada telefónica. Es tu pareja, y parece que tiene un problema. Te explica de varias formas una misma situación como intentando que reacciones de alguna forma, como si supieras algo que no quieres decir, cuando de pronto lo recuerdas: LE DEBES 50 LUCAS Y NO TE ACORDABAS.*

---

7. Insertar un nuevo registro en la tabla.

| nombre (PK)        | me_debe | cuotas_cobrar | le_debo | cuotas_pagar |
|---------------------|--------:|---------------:|--------:|--------------:|
| tía carmen          | 0       | 0               | 5000    | 1              |
| papá                | 0       | 0               | 15000   | 3              |
| nacho               | 10000   | 2               | 7000    | 1              |
| almacén esquina     | 0       | 0               | 13000   | 2              |
| vicios varios       | 0       | 0               | 35000   | 35             |
| compañero trabajo   | 50000   | 5               | 0       | 0              |
| pareja              | 0       | 0               | 50000   | 1              |

8. Con este cambio empezó a temblar realmente tu situación económica y lo primero que quisiera averiguar es ¿De cuánto será la cuota a pagar este mes?

| cuota mes |
|----------:|
| 74500     |

---

*No tuviste la valentía para negociar las cuotas con tu pareja, pero la señora del almacén de la esquina te tiene buena y te permitió bondadosamente pagarle en 13 cuotas.*

---

9. Realizar el update en la tabla.

| nombre              | me_debe | cuotas_cobrar | le_debo | cuotas_pagar |
|---------------------|--------:|---------------:|--------:|--------------:|
| tía carmen          | 0       | 0               | 5000    | 1              |
| papá                | 0       | 0               | 15000   | 3              |
| nacho               | 10000   | 2               | 7000    | 1              |
| vicios varios       | 0       | 0               | 35000   | 35             |
| compañero trabajo   | 50000   | 5               | 0       | 0              |
| pareja              | 0       | 0               | 50000   | 1              |
| almacén esquina     | 0       | 0               | 13000   | 13             |

10. Ahora que realizaste este pequeño (pero importante) ajuste, ¿de cuánto será la cuota a pagar este mes?
