import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { resolve } from "path";
import {
  USERS_SERVICE_NAME,
  protobufPackage,
} from "../../globals/interfaces/auth";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "localhost:50051",
          package: protobufPackage,
          protoPath: resolve(__dirname, "../../globals/protos/auth.proto"),
        },
      },
    ]),
  ],

  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
