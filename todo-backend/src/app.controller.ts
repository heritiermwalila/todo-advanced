import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/version')
  getAll(@Res() res: Response): Record<string, any> {
    return res.status(200).json({
      version: "1.0.0"
    })
  }

  
}
