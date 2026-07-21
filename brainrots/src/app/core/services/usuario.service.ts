import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUsuarios() {
    return this.supabaseService.getClient().from('usuarios').select('*');
  }

  async createUsuario(payload: Record<string, unknown>) {
    return this.supabaseService.getClient().from('usuarios').insert(payload);
  }

  async updateUsuario(id: string | number, payload: Record<string, unknown>) {
    return this.supabaseService.getClient().from('usuarios').update(payload).eq('id', id);
  }

  async deleteUsuario(id: string | number) {
    return this.supabaseService.getClient().from('usuarios').delete().eq('id', id);
  }
}
