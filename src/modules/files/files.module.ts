import { Module, forwardRef } from '@nestjs/common';
import { FilesService } from './files.service';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [FilesService],
  imports: [forwardRef(() => UsersModule)],
  exports: [FilesService],
})
export class FilesModule {}
