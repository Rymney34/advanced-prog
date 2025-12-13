import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn()
  }
}));

vi.mock("../../schemas/user.js")

import { createUser } from '../../controllers/userController.js';
import User from "../../schemas/user.js";
import bcryptjs from 'bcryptjs';

function mockResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  };
}

describe("Create User - Unit Tests", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        bcryptjs.hash.mockResolvedValue("mocked_hashed_password");
    });

    test("should return 400 if required fields are missing", async () => {
        const req = { body: { firstName: "John" } };
        const res = mockResponse();
        
        await createUser(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
    });

    test("should create user successfully", async () => {
        const req = {
        body: {
            firstName: "John",
            email: "john@example.com", 
            password: "mocked_hashed_password",
            isAdmin: false,
        }
        };
        const res = mockResponse();

        const mockSave = vi.fn().mockResolvedValue();

        const mockUserInstance = {
            firstName: req.body.firstName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
            save: mockSave,
        };
        console.log(mockUserInstance)

        User.mockImplementation(() => mockUserInstance);

        await createUser(req, res)
                    //check if save is called, then that respsonse is 201(succes) 
                    // and actualy returning json object of from controller that is succesfuly created
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            firstName: "John",
            email: "john@example.com",
            isAdmin: false,
        });
    });
});