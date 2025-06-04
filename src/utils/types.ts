export interface roomData {
    username: string;
    socketId: string;
}

export interface User {
    id: string;              
    accountId: string;       
    username: string;        
    provider: string;         
    email: string;           
    status: string;           
    profile: string;         
    isVerified: boolean;     
    createdAt: Date;          
    updatedAt: Date;       
    socketId: string;  
  }
