**Generative AI Coding Exercise — Task Management API (NestJS)**

This section documents the required Generative AI exercise for the technical interview.

## 1. Prompt Used

Generate a NestJS backend scaffold for a simple Task Management REST API using TypeORM with PostgreSQL. The API is public for now (no authentication), but code should be structured so access control can be added later.

**Domain:**
- **User:** id, email, name, tasks (one-to-many)
- **Task:** id, title, description, status (enum: pending, in_progress, done), due_date (date), user (many-to-one)

**Requirements:**
- Use NestJS modules/controllers/services
- TypeORM entities with proper relations (User ↔ Task)
- CRUD endpoints for Tasks: GET/POST/GET:id/PATCH:id/DELETE:id
- DTOs using class-validator
- Use enums for status
- Add minimal placeholder logic in service

**Tradeoffs & Notes:**
- Minimal validation to avoid over-constraining (e.g. optional due_date, nullable description)
- Public endpoints now, but add comments where auth/ownership checks could later be inserted
- PostgreSQL date handling: use simple date and ISO strings for now, note that timestamptz could be used later
- Do not generate bootstrapping code or config files
- Output only relevant backend code.

## 2.  AI Output (Representative Sample)

Below are key generated files (excerpted for brevity).

### Task Entity

```typescript
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  dueDate: Date | null;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

### User Entity

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
```

The AI also generated:
- TasksController (CRUD)
- TasksService (placeholder logic with TODOs)
- CreateTaskDto / UpdateTaskDto using class-validator
- TaskStatus enum
- TasksModule
- Import of module in AppModule

## 3. 🔍 Validation & Critical Review of AI Output

### ✔ Correct & Useful Parts

The AI correctly:
- Used NestJS architecture (module → controller → service)
- Applied TypeORM relationships (OneToMany / ManyToOne)
- Created DTOs with class-validator
- Used enum for TaskStatus
- Made validation minimal as requested
- Marked optional fields (dueDate, description)
- Left TODO comments for future security/ownership logic

This matches the intended tradeoffs.

### ⚙ Corrections & Improvements

| Area | Observation | Improvement |
|------|-------------|-------------|
| **Validation** | dueDate accepts any ISO date | Could require future-only dates |
| **Ownership** | Public API for now | TODO added for future userId extraction |
| **Data integrity** | onDelete: 'CASCADE' used | Might conflict with business rules — soft deletes could be considered |
| **Security** | Endpoints open | Guards can be added later using JWT/Passport |
| **Dates** | Uses date | Could use timestamptz for multi-region correctness |

###  Edge Cases Considered

The output + review surfaced edge cases such as:
- Invalid userId references
- Missing tasks on update/delete → handled via NotFoundException
- ISO date formats vs. timezone correctness
- Overfetching tasks (ownership filtering not applied yet)

###  Security Considerations (Deferred by Design)

For now endpoints are public, BUT code has TODO markers where future security plugs in:

Examples noted by AI:
```typescript
// TODO: Add authentication guard
// TODO: Add ownership check
```

Future enhancements could include:
- JWT guards (AuthGuard('jwt'))
- Role-based checks


This matches the requested security tradeoff.

### 🚀 Performance & Architecture Review

- Using TypeORM repositories is idiomatic
- Relations are eagerly loaded in findOne() (might toggle later)
- DTOs separate API layer from persistence
- App structure is extensible (adding UsersModule later is trivial)

For an early scaffold, the performance/architecture choices are reasonable.
