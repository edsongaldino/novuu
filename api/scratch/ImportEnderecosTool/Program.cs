using System;
using System.IO;
using System.Globalization;
using Npgsql;

class Program
{
    static void Main()
    {
        var connStr = "Host=localhost;Database=lancamentos;Username=postgres;Password=259864";
        using var conn = new NpgsqlConnection(connStr);
        conn.Open();

        Console.WriteLine("1. Ensure DDL columns exist...");
        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = @"
                ALTER TABLE empreendimentos ADD COLUMN IF NOT EXISTS endereco_id INT;
                ALTER TABLE enderecos ADD COLUMN IF NOT EXISTS construtora_id INT;
            ";
            cmd.ExecuteNonQuery();
        }

        var now = DateTime.UtcNow;

        Console.WriteLine("2. Importing Estados...");
        var estadosPath = @"C:\Projects\novuu\api\estados_dump_utf8.txt";
        if (File.Exists(estadosPath))
        {
            var lines = File.ReadAllLines(estadosPath);
            for (int i = 1; i < lines.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(lines[i])) continue;
                var cols = lines[i].Split('\t');
                if (cols.Length < 3 || !int.TryParse(cols[0], out int id)) continue;

                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    INSERT INTO estados (id, uf, nome, created_at, updated_at)
                    VALUES (@id, @uf, @nome, @now, @now)
                    ON CONFLICT (id) DO UPDATE SET uf = @uf, nome = @nome, updated_at = @now;
                ";
                cmd.Parameters.AddWithValue("id", id);
                cmd.Parameters.AddWithValue("uf", cols[1]);
                cmd.Parameters.AddWithValue("nome", cols[2]);
                cmd.Parameters.AddWithValue("now", now);
                cmd.ExecuteNonQuery();
            }
            using var seq = conn.CreateCommand();
            seq.CommandText = "SELECT setval(pg_get_serial_sequence('\"estados\"', 'id'), coalesce(max(\"id\"), 1)) FROM \"estados\";";
            try { seq.ExecuteNonQuery(); } catch { }
        }

        Console.WriteLine("3. Importing Cidades...");
        var cidadesPath = @"C:\Projects\novuu\api\cidades_dump_utf8.txt";
        if (File.Exists(cidadesPath))
        {
            var lines = File.ReadAllLines(cidadesPath);
            for (int i = 1; i < lines.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(lines[i])) continue;
                var cols = lines[i].Split('\t');
                if (cols.Length < 3 || !int.TryParse(cols[0], out int id) || !int.TryParse(cols[1], out int estadoId)) continue;

                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    INSERT INTO cidades (id, estado_id, nome, status, created_at, updated_at)
                    VALUES (@id, @estado_id, @nome, 'Ativo', @now, @now)
                    ON CONFLICT (id) DO UPDATE SET estado_id = @estado_id, nome = @nome, updated_at = @now;
                ";
                cmd.Parameters.AddWithValue("id", id);
                cmd.Parameters.AddWithValue("estado_id", estadoId);
                cmd.Parameters.AddWithValue("nome", cols[2]);
                cmd.Parameters.AddWithValue("now", now);
                cmd.ExecuteNonQuery();
            }
            using var seq = conn.CreateCommand();
            seq.CommandText = "SELECT setval(pg_get_serial_sequence('\"cidades\"', 'id'), coalesce(max(\"id\"), 1)) FROM \"cidades\";";
            try { seq.ExecuteNonQuery(); } catch { }
        }

        Console.WriteLine("4. Importing Bairros...");
        var bairrosPath = @"C:\Projects\novuu\api\bairros_dump_utf8.txt";
        if (File.Exists(bairrosPath))
        {
            var lines = File.ReadAllLines(bairrosPath);
            for (int i = 1; i < lines.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(lines[i])) continue;
                var cols = lines[i].Split('\t');
                if (cols.Length < 3 || !int.TryParse(cols[0], out int id) || !int.TryParse(cols[1], out int cidadeId)) continue;

                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    INSERT INTO bairros (id, cidade_id, nome, created_at, updated_at)
                    VALUES (@id, @cidade_id, @nome, @now, @now)
                    ON CONFLICT (id) DO UPDATE SET cidade_id = @cidade_id, nome = @nome, updated_at = @now;
                ";
                cmd.Parameters.AddWithValue("id", id);
                cmd.Parameters.AddWithValue("cidade_id", cidadeId);
                cmd.Parameters.AddWithValue("nome", cols[2]);
                cmd.Parameters.AddWithValue("now", now);
                cmd.ExecuteNonQuery();
            }
            using var seq = conn.CreateCommand();
            seq.CommandText = "SELECT setval(pg_get_serial_sequence('\"bairros\"', 'id'), coalesce(max(\"id\"), 1)) FROM \"bairros\";";
            try { seq.ExecuteNonQuery(); } catch { }
        }

        Console.WriteLine("5. Importing Enderecos...");
        var enderecosPath = @"C:\Projects\novuu\api\enderecos_dump_utf8.txt";
        int totalEnderecos = 0;
        if (File.Exists(enderecosPath))
        {
            var lines = File.ReadAllLines(enderecosPath);
            for (int i = 1; i < lines.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(lines[i])) continue;
                var cols = lines[i].Split('\t');
                if (cols.Length < 4 || !int.TryParse(cols[0], out int id)) continue;
                int.TryParse(cols[1], out int estadoId);
                int.TryParse(cols[2], out int cidadeId);
                int.TryParse(cols[3], out int bairroId);

                string cep = cols.Length > 4 && cols[4] != "NULL" ? cols[4] : "";
                string logradouro = cols.Length > 5 && cols[5] != "NULL" ? cols[5] : "";
                string? complemento = cols.Length > 6 && cols[6] != "NULL" ? cols[6] : null;
                string? numero = cols.Length > 7 && cols[7] != "NULL" ? cols[7] : null;

                decimal? lat = null, lon = null;
                if (cols.Length > 8 && decimal.TryParse(cols[8].Replace(',', '.'), NumberStyles.Any, CultureInfo.InvariantCulture, out decimal dLat)) lat = dLat;
                if (cols.Length > 9 && decimal.TryParse(cols[9].Replace(',', '.'), NumberStyles.Any, CultureInfo.InvariantCulture, out decimal dLon)) lon = dLon;

                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                    INSERT INTO enderecos (id, estado_id, cidade_id, bairro_id, cep, logradouro, complemento, numero, latitude, longitude, created_at, updated_at)
                    VALUES (@id, @estado_id, @cidade_id, @bairro_id, @cep, @logradouro, @complemento, @numero, @latitude, @longitude, @now, @now)
                    ON CONFLICT (id) DO UPDATE SET
                        estado_id = @estado_id,
                        cidade_id = @cidade_id,
                        bairro_id = @bairro_id,
                        cep = @cep,
                        logradouro = @logradouro,
                        complemento = @complemento,
                        numero = @numero,
                        latitude = @latitude,
                        longitude = @longitude,
                        updated_at = @now;
                ";
                cmd.Parameters.AddWithValue("id", id);
                cmd.Parameters.AddWithValue("estado_id", estadoId > 0 ? estadoId : 1);
                cmd.Parameters.AddWithValue("cidade_id", cidadeId > 0 ? cidadeId : 1);
                cmd.Parameters.AddWithValue("bairro_id", bairroId > 0 ? bairroId : 1);
                cmd.Parameters.AddWithValue("cep", cep);
                cmd.Parameters.AddWithValue("logradouro", logradouro);
                cmd.Parameters.AddWithValue("complemento", (object?)complemento ?? DBNull.Value);
                cmd.Parameters.AddWithValue("numero", (object?)numero ?? DBNull.Value);
                cmd.Parameters.AddWithValue("latitude", (object?)lat ?? DBNull.Value);
                cmd.Parameters.AddWithValue("longitude", (object?)lon ?? DBNull.Value);
                cmd.Parameters.AddWithValue("now", now);
                cmd.ExecuteNonQuery();
                totalEnderecos++;
            }
            using var seq = conn.CreateCommand();
            seq.CommandText = "SELECT setval(pg_get_serial_sequence('\"enderecos\"', 'id'), coalesce(max(\"id\"), 1)) FROM \"enderecos\";";
            try { seq.ExecuteNonQuery(); } catch { }
        }
        Console.WriteLine($"Enderecos imported: {totalEnderecos}");

        Console.WriteLine("6. Linking Empreendimentos to Enderecos...");
        var empEndPath = @"C:\Projects\novuu\api\empreendimentos_enderecos_dump_utf8.txt";
        int totalLinks = 0;
        if (File.Exists(empEndPath))
        {
            var lines = File.ReadAllLines(empEndPath);
            for (int i = 1; i < lines.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(lines[i])) continue;
                var cols = lines[i].Split('\t');
                if (cols.Length < 2 || !int.TryParse(cols[0], out int empId) || !int.TryParse(cols[1], out int endId)) continue;

                using var cmd = conn.CreateCommand();
                cmd.CommandText = "UPDATE empreendimentos SET endereco_id = @endId WHERE id = @empId;";
                cmd.Parameters.AddWithValue("empId", empId);
                cmd.Parameters.AddWithValue("endId", endId);
                cmd.ExecuteNonQuery();
                totalLinks++;
            }
        }
        Console.WriteLine($"Empreendimentos updated: {totalLinks}");
        Console.WriteLine("SUCCESS_ALL_IMPORTED");
    }
}
