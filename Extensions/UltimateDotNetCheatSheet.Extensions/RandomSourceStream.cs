using System.Security.Cryptography;

namespace UltimateDotNetCheatSheet.Extensions;

public class RandomSourceStream : NullStream
{
    public override bool CanWrite => false;

    public override int Read(byte[] buffer, int offset, int count)
    {
        RandomNumberGenerator.Fill(buffer.AsSpan());
        Position += (count - offset);
        return count - offset;
    }
}
