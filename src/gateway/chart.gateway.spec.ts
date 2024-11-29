import { Test, TestingModule } from '@nestjs/testing';
import { ChartGateway } from './socket.gateway';

describe('ChartGateway', () => {
  let gateway: ChartGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartGateway],
    }).compile();

    gateway = module.get<ChartGateway>(ChartGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
