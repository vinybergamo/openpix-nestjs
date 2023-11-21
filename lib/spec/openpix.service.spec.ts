import { OpenPixService } from '../services/openpix.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModuleForTest } from '../constants';
import { providers } from '../providers';

describe('OpenpixService', () => {
  let service: OpenPixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModuleForTest],
      providers,
    }).compile();

    service = module.get<OpenPixService>(OpenPixService);
  });

  it('should be created', async () => {
    const teste = await service
      .setHeaders({
        Authorization:
          'Q2xpZW50X0lkXzJmNjJhYjI2LWYxZmYtNDJlMy04MjliLWRiMTBjMjU1OTdkZTpDbGllbnRfU2VjcmV0X2JwNkU2eExteElOYnprZHJsc2tXYmlFeTdTRjk5MUwwdWdKKzJ1c3FEMzg9',
      })
      .charge.list();
    console.log(teste);
    expect(service).toBeTruthy();
  });
});
