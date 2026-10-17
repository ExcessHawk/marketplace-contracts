# @marketplace/contracts

Los esquemas de [Zod](https://zod.dev) que comparten el backend y el frontend del
marketplace. Un solo esquema, dos usos: el servidor valida con él lo que entra, y
el navegador deriva de él los tipos y la validación de sus formularios.

Que vivan aquí y no duplicados en cada lado es a propósito. Si el contrato de
`POST /api/checkout` cambia, cambia en un archivo, y las dos puntas se enteran al
compilar — no en producción.

## Qué hay dentro

| Archivo | Qué cubre |
|---|---|
| `common.ts` | Piezas reutilizadas: slug, uuid, dinero en centavos, paginación |
| `auth.ts` | Registro, login, refresco, perfil |
| `catalog.ts` | Productos, variantes, categorías, búsqueda |
| `cart.ts` | Carrito y sus líneas |
| `shipping.ts` | Tarifas de envío por vendedor |
| `address.ts` | Direcciones de entrega, con los 32 estados de México |
| `orders.ts` | Checkout, pedidos y subpedidos |
| `payouts.ts` | Pagos al vendedor |
| `disputes.ts` | Aclaraciones |
| `reviews.ts` | Reseñas y respuestas del vendedor |
| `chat.ts` | Conversaciones, mensajes y boletos de WebSocket |
| `admin.ts` | Cola de tiendas y bitácora de la plataforma |
| `demo.ts` | Sesión de demostración (solo con `DEMO_MODE`) |

## Cómo se usa

```bash
bun add github:ExcessHawk/marketplace-contracts
```

El paquete exporta TypeScript sin compilar, a propósito: tanto Bun como Vite lo
leen directo, y así los tipos nunca se desfasan de un `dist/` olvidado.

```ts
import { CheckoutSchema, type CheckoutDto } from '@marketplace/contracts'
```

Para que la resolución apunte al archivo y no al `main` del paquete, cada lado
lleva un alias:

```jsonc
// backend/tsconfig.json
"paths": {
  "@marketplace/contracts": ["./node_modules/@marketplace/contracts/schemas/index.ts"]
}
```

```ts
// frontend/vite.config.ts
alias: {
  '@marketplace/contracts': path.resolve(root, 'node_modules/@marketplace/contracts/schemas/index.ts'),
}
```

## Al cambiar un contrato

1. Cambias el esquema aquí y haces push.
2. `bun update @marketplace/contracts` en el backend y en el frontend.
3. `tsc --noEmit` en ambos te dice qué se rompió.

Ese tercer paso es el punto de todo esto.

## Parte de

- [marketplace-back](https://github.com/ExcessHawk/marketplace-back) — API en Bun sobre Veloce-TS
- [marketplace-front](https://github.com/ExcessHawk/marketplace-front) — React 19 + Vite
