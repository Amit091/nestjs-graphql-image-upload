import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service'; // Adjust the path as necessary
import { createWriteStream } from 'fs';
import { join } from 'path';
import { File } from 'graphql-upload';

// Mock the createWriteStream function from 'fs'
jest.mock('fs', () => ({
  createWriteStream: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn().mockImplementation((event, callback) => {
      if (event === 'finish') {
        callback(); // Simulate finish event
      }
      return this;
    }),
  }),
}));

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveFile', () => {
    it('should save the file and return an empty string', async () => {
      const mockFile: File = {
        filename: 'test.txt',
        createReadStream: jest.fn().mockReturnValue({
          pipe: jest.fn().mockReturnThis(),
          on: jest.fn().mockImplementation((event, callback) => {
            if (event === 'finish') {
              callback(); // Simulate finish event
            }
            return this;
          }),
        }),
      } as unknown as File;

      const result = await service.saveFile(mockFile);

      // Check if createWriteStream was called with the correct path
      expect(createWriteStream).toHaveBeenCalledWith(
        join(__dirname, '..', '..', 'uploads', 'test.txt'),
      );
      expect(result).toBe('');
    });
  });
});
