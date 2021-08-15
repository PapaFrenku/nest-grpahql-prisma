import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { FileEntity } from './file.entity';
import * as uuid from 'uuid'
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => FileEntity)
  async singleUpload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    {createReadStream, filename, mimetype, encoding }: FileUpload,
  ): Promise<any> {
    let fn = uuid.v4() + filename
    const res = await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${fn}`))
        .on('finish', (res) => {
          return resolve(true)
        })
        .on('error', () => {
          return reject(false)
        })
    );
    console.log(res)
    if(!res) {
      return {
        filename: null
      }
    }
    return {
      filename: fn
    }
    // const res = await this.fileService.createFile(m)
  }
}
