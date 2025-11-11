# Requerimiento de Práctica: Task Manager Dashboard

## Contexto

Crear un dashboard de gestión de tareas tipo Kanban con funcionalidad de drag & drop, utilizando las nuevas características de Angular 18.

## Objetivos de Aprendizaje

- [x] Implementar Signals para manejo de estado reactivo
- [x] Utilizar RxJS para operaciones asíncronas y flujos de datos (Se emplearon signals para el flujo de datos)
- [x] Aplicar CDK Drag & Drop
- [x] Componentes standalone
- [x] Nueva sintaxis de control flow (@for, @if)

---

## 📝 Requerimientos Funcionales

### 1. Dashboard Principal (40 puntos)

Crear un componente `DashboardComponent` que muestre:

#### Panel de Estadísticas (15 puntos)

- [x] Total de tareas
- [x] Tareas en progreso
- [x] Tareas completadas
- [x] Tareas vencidas (overdue)
- [x] Las estadísticas deben actualizarse automáticamente usando `computed signals`

#### Board Kanban (25 puntos)

- [x] 4 columnas: "To Do", "In Progress", "Review", "Done"
- [x] Cada columna muestra el contador de tareas
- [x] Implementar drag & drop entre columnas usando `@angular/cdk/drag-drop`

---

### 2. Servicio de Tareas (30 puntos)

- [x] Crear `TaskService` que maneje:

```typescript
// Estructura de datos requerida
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
}
```

#### Implementación requerida:

- [x] Usar `signal<Task[]>` para almacenar las tareas
- [x] Crear `computed signals` para filtrar tareas por estado:
  - `todoTasks()`
  - `inProgressTasks()`
  - `reviewTasks()`
  - `doneTasks()`
- [x] Crear `computed signal` para estadísticas generales
- [x] Método para actualizar estado de tarea
- [x] Método para crear nueva tarea
- [x] 🎁 **Bonus:** Usar RxJS para simular API call con delay

---

### 3. Componente Task Card (20 puntos)

Crear `TaskCardComponent` que:

- [x] Reciba la tarea como `@Input()`
- [x] Emita eventos con `@Output()` para:
  - Click en la tarjeta
  - Cambio de estado (toggle done)
- [x] Muestre prioridad con código de colores
- [x] Muestre fecha de vencimiento

---

### 4. Funcionalidad de Búsqueda - Bonus (10 puntos)

Implementar búsqueda de tareas usando:

- `signal` para el término de búsqueda
- `computed signal` o RxJS operator para filtrar tareas
- Debounce de 300ms usando RxJS

---

## ✨ Mejoras Adicionales (Opcional)

Si terminas antes del tiempo estimado, considera agregar:

- [ ] Persistencia en localStorage
- [ ] Animaciones para drag & drop
- [ ] Filtros por prioridad
- [ ] Ordenamiento de tareas
- [ ] Edición inline de tareas
- [ ] Modo oscuro/claro
- [ ] Tests unitarios con Jasmine/Jest

---

**¡Buena suerte! 🚀**
