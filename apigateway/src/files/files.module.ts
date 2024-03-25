import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join, resolve } from "path";
import { FilesController } from "./files.controller";
import {
  FILE_SERVICE_NAME,
  protobufPackage,
} from "../../globals/interfaces/file";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: "localhost:50052",
          package: protobufPackage,
          protoPath: join(__dirname, "../../globals/protos/file.proto"),
        },
      },
    ]),
  ],

  controllers: [FilesController],
  providers: [],
})
export class FilesModule {}
