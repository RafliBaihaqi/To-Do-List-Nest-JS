import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interface/user.interface';
import { RegisterDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { firstName, lastName, email, password } = registerDto;
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = this.jwtService.sign({ userId: user._id });

    return { message: 'User Registered!', token };
  }
}
