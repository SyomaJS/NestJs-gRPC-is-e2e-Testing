import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Course } from "./course.entity";
import { User as IUserAttr } from "../interfaces/auth";

@Entity({ name: "user", schema: "auth" })
@Unique(["login"])
export class User implements IUserAttr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  firstName: string;

  @Column({ type: String, nullable: false })
  lastName: string;

  @Column({ type: String, nullable: false })
  login: string;

  @Column({ type: String, nullable: false })
  hashedPassword: string;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @ManyToMany(() => Course, (course) => course.users)
  @JoinTable()
  courses: Course[];
}
