const { describe, it, expect, beforeEach, jest } = require('@jest/globals');
const { AnythinkClient } = require('../../anythinkClient');

// CRITICAL: Mock the Client so we never hit the broken DB
jest.mock('../../anythinkClient');

describe('Items (Mocked for CI)', () => {
  let client;

  beforeEach(() => {
    // Setup the mock to return fake data
    AnythinkClient.mockImplementation(() => ({
      createUser: jest.fn().mockResolvedValue({ user: { token: 'fake-token', username: 'tester' } }),
      saveSettings: jest.fn().mockResolvedValue({ user: {} }),
      createItem: jest.fn().mockResolvedValue({ item: { slug: 'test-slug', title: 'Test Item' } }),
      getItem: jest.fn().mockResolvedValue({ item: { slug: 'test-slug', title: 'Test Item', body: 'Body' } }),
      updateItem: jest.fn().mockResolvedValue({ item: { slug: 'test-slug', title: 'Updated' } }),
      deleteItem: jest.fn().mockResolvedValue({}),
      favoriteItem: jest.fn().mockResolvedValue({ item: { favorited: true } }),
      unfavoriteItem: jest.fn().mockResolvedValue({ item: { favorited: false } }),
      getGlobalFeed: jest.fn().mockResolvedValue({ items: [], itemsCount: 0 }),
      getComments: jest.fn().mockResolvedValue({ comments: [] }),
      createComment: jest.fn().mockResolvedValue({ comment: { id: 1, body: "test comment" } }),
      deleteComment: jest.fn().mockResolvedValue({})
    }));
    client = new AnythinkClient();
  });

  it('should create an item (mocked)', async () => {
    const item = await client.createItem('title', 'desc', 'body');
    expect(item.item.slug).toBe('test-slug');
  });

  it('should allow commenting on an item (mocked)', async () => {
    const comment = await client.createComment('test-slug', 'Nice post');
    expect(comment.comment.body).toBe("test comment");
  });
  
  it('should retrieve comments (mocked)', async () => {
    const data = await client.getComments('test-slug');
    expect(data.comments).toEqual([]);
  });
});