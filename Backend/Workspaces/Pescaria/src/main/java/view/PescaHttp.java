package view;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import controller.PescasProcess;
import controller.PescasProcess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Pescas;

@WebServlet("/pesca")
public class PescaHttp extends HttpServlet {
	PrintWriter pw;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		pw = resp.getWriter();

		String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

		try {
			JSONObject obj = new JSONObject(body);

			String cidade = obj.getString("cidade");
			int quantidade = obj.getInt("quantidade");

			Pescas pesca = new Pescas();
			pesca.setCidade(cidade);
			pesca.setQuantidade(quantidade);

			PescasProcess pp = new PescasProcess();

			if (pp.create(pesca)) {
				obj.put("id", pesca.getId());
				pw.write(obj.toString());
			} else {
				resp.setStatus(402);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		pw = resp.getWriter();

		PescasProcess pp = new PescasProcess();

		String tempId = req.getParameter("id");
		int id = Integer.parseInt(tempId);

		if (pp.delete(id) == false) {
			resp.setStatus(401);
		}
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		pw= resp.getWriter();
		PescasProcess rp = new PescasProcess();

		String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

		try {
			JSONObject obj = new JSONObject(body);

			String cidade = obj.getString("cidade");
			int quantidade = obj.getInt("quantidade");
			int id = obj.getInt("id");

			Pescas pesca = new Pescas();
			pesca.setId(id);
			pesca.setCidade(cidade);
			pesca.setQuantidade(quantidade);

			if (rp.update(pesca) == true) {
				pw.write(obj.toString());
			} else {
				resp.setStatus(401);
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		PescasProcess rp = new PescasProcess();
		pw = resp.getWriter();


		JSONArray arr;
		try {
			arr = rp.read();
			pw.write(arr.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	

}
