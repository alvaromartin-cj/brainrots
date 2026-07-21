import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private createResult(response: any = null, fallbackData: any = null) {
    return {
      success: !response?.error,
      data: response?.data ?? fallbackData,
      error: response?.error ?? null
    };
  }

  async login(email: string, password: string) {
    try {
      const response = await this.supabaseService.getClient().auth.signInWithPassword({ email, password });
      return this.createResult(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error
      };
    }
  }

  async register(email: string, password: string) {
    try {
      const response = await this.supabaseService.getClient().auth.signUp({
        email,
        password
      });

      return this.createResult(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error
      };
    }
  }

  async logout() {
    try {
      const response = await this.supabaseService.getClient().auth.signOut();
      return this.createResult(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error
      };
    }
  }

  async getUser() {
    try {
      const response = await this.supabaseService.getClient().auth.getUser();
      return this.createResult(response);
    } catch (error) {
      return {
        success: false,
        data: null,
        error
      };
    }
  }

  async getCurrentUser() {
    return this.getUser();
  }
}
