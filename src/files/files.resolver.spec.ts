import { Test, TestingModule } from '@nestjs/testing';
import { FilesResolver } from './files.resolver';
import { FilesService } from './files.service';
import { FileUpload } from 'graphql-upload';

describe('FilesResolver', () => {
  let resolver: FilesResolver;
  let filesService: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesResolver,
        {
          provide: FilesService,
          useValue: {
            saveFile: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<FilesResolver>(FilesResolver);
    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('fact', () => {
    it('should return a random fact', () => {
      const randomFact = resolver.fact();
      expect(randomFact).toHaveProperty('title');
      expect(randomFact).toHaveProperty('detail');
      expect(resolver['facts']).toContain(randomFact);
    });
  });

  describe('uploadFile', () => {
    it('should call saveFile and return a success message', async () => {
      const mockFileUpload = {
        file: {
          filename: 'test.txt',
          createReadStream: jest.fn().mockReturnValue({
            pipe: jest.fn().mockReturnThis(),
            on: jest.fn().mockImplementation((event, callback) => {
              if (event === 'finish') {
                callback();
              }
              return this;
            }),
          }),
        },
      } as unknown as FileUpload;

      (filesService.saveFile as jest.Mock).mockResolvedValue('success');

      const result = await resolver.uploadFile(mockFileUpload);

      expect(filesService.saveFile).toHaveBeenCalledWith(mockFileUpload.file);
      expect(result).toBe('success');
    });
  });

  describe('uploadFiles', () => {
    it('should call saveFile for each file and return an array of success messages', async () => {
      const mockFileUploads: FileUpload[] = [
        {
          file: {
            filename: 'file1.txt',
            createReadStream: jest.fn().mockReturnValue({
              pipe: jest.fn().mockReturnThis(),
              on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'finish') {
                  callback();
                }
                return this;
              }),
            }),
          },
        },
        {
          file: {
            filename: 'file2.txt',
            createReadStream: jest.fn().mockReturnValue({
              pipe: jest.fn().mockReturnThis(),
              on: jest.fn().mockImplementation((event, callback) => {
                if (event === 'finish') {
                  callback();
                }
                return this;
              }),
            }),
          },
        },
      ] as unknown as FileUpload[];

      (filesService.saveFile as jest.Mock).mockResolvedValue('success');

      const result = await resolver.uploadFiles(mockFileUploads);

      expect(filesService.saveFile).toHaveBeenCalledTimes(2);
      expect(result).toEqual(['success', 'success']);
    });
  });
});
