package controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import model.Pescas;


public class PescasProcess {
	Connection con;
	PreparedStatement ps;
	ResultSet rs;
	
	public PescasProcess() {
		this.con = ConnectionDB.getConnection();
	}
	public boolean create(Pescas pesca) {
		
String query = "INSERT INTO pesca VALUES (DEFAULT, ?, ?)";
		
		try {
			ps = con.prepareStatement(query);
			
			ps.setString(1, pesca.getCidade());
			ps.setInt(2, pesca.getQuantidade());
			
			
			if(ps.executeUpdate() > 0) {
				rs = ps.getGeneratedKeys();
				rs.next();
				int id = rs.getInt(1);
				pesca.setId(id);
				ps.close();
				return true;
			}
			
			ps.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	
		
	}
	public boolean delete(int id) {
		String query = "Delete from pesca where id = ?";
		
		try {
			ps=con.prepareStatement(query);
			ps.setInt(1, id);
			
			if (ps.executeUpdate()>0) {
				ps.close();
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
		
	}
public boolean update(Pescas pesca) {
		
		String query = "UPDATE pesca SET cidade = ?, quantidade = ? WHERE id = ? " ;
					  
		
		try {
			ps = con.prepareStatement(query);
			
			ps.setString(1, pesca.getCidade());
			ps.setInt(2, pesca.getQuantidade());
			ps.setInt(3, pesca.getId());
			System.out.println(query);
			if(ps.executeUpdate() > 0) {
				ps.close();
				
				return true;
			}
			
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
		
	}
	
		public JSONArray read() throws JSONException, SQLException {
			
			JSONArray arr = new JSONArray();
			
			String query = "Select * from pesca";
			
			ps=con.prepareStatement(query);
		
			rs = ps.executeQuery();
			
			while(rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("cidade", rs.getString("cidade"));
				obj.put("quantidade", rs.getInt("quantidade"));
				obj.put("id", rs.getInt("id"));
				
				arr.put(obj);
			}
			
			return arr;
			
		}
		
		public JSONArray status(String cidade, int quantidade) {
			
			String query = "Select * from pesca";
			JSONArray arr = new JSONArray();
			
			if((cidade == "pedreira" && quantidade >= 10 )|| (cidade == "santos" && quantidade >= 100 )||
					(cidade == "Campinas" && quantidade >= 30 )||(cidade == "Ubatuba" && quantidade >= 150 )
					) {
				query += "Where cidade = ? and quantiade = ?";
				try {
					ps=con.prepareStatement(query);
					ps.setString(1, cidade);
					ps.setInt(2, quantidade);
					 
				
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			
			
			return arr;
			
		}
	

}
